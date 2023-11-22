import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/Search.module.css';
import back from '../../../asset/images/back.png';
import hot from '../../../asset/images/hot.png';
import search from '../../../asset/images/search.png';
import {useLocation, useNavigate} from "react-router-dom";
import Loading from "../../atoms/Loading";
import axios from "axios";
import {Mobile, PC} from "../../config/Responsive";
import SuggestComunity from "../../blocks/SuggestComunity";
import {saveToLocalStorage} from "../../../common/CommonFunc";
import {interestCommunityGet} from "../../../common/api/ApiGetService";

const SearchResult = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchSuggest, setSearchSuggest] = useState([]);
  const [suggestBool, setSuggestBool] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [sugKeyword, setSugKeyword] = useState(searchParams.get("sug"));
  const [interest, setInterest] = useState(searchParams.get("interest"));
  const [page, setPage] = useState(0);
  const [menuName, setMenuName] = useState('');
  const [communityList, setCommunityList] = useState([]);

  const backHandler = () => {
    nav('/search');
  }

  const searchInterest = (menuName) => {
    setLoading(false);
    setMenuName(menuName);
    interestCommunityGet(menuName, 0, 10).then((res) => {

      if(res.status === 200) {
        const newData = res.data.content;
        setCommunityList(newData);
      }

    }).catch((err) => {

    })
  }


  useEffect(() => {
    setLoading(true);

    setTimeout(() => {

      if (keyword != null) {
        searchCommunitys(keyword);
        return ;
      }

      if (interest != null) {
        searchInterest(interest)
        return ;
      }


    }, 700);

    window.addEventListener('scroll', handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  const searchCommunitys = (text) => {
    setLoading(false);

    axios.get(`http://104.197.46.54/api/v1/search/communitySearch?name=${text}`).then((res) => {

      if(res.status == 200) {
        console.log(res.data)
        setCommunityList(res.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const delay = (timeout) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('data');
      }, timeout);
    });
  }

  const searchFunc = async () => {
    // 공백 검색 불가
    if (searchText == '') {
      return ;
    }

    // 검색 시 검색했던 단어 초기화 & 단어 자동완성 사라지게..
    setSearchText('');
    setSearchSuggest([]);

    // 로딩 이미지 생성 후 사라지게..
    setLoading(true);
    setCommunityList([]);

    await delay(700);

    // community 검색..
    searchCommunitys(searchText);

    // 검색한 단어를 실시간 검색어 집계에 반영..
    postRealTimeKeyWord(searchText);

    // 검색어 오탈시 추천 검색어 노출..
    const typoResult = await typoSuggestKeywords();

    // 유저 최근 검색어 추가 ..
    historyKeywordFunc();

    // 검색 한 단어와 오탈자 추천검색어 state 저장..
    setKeyword(searchText);
    setSugKeyword(typoResult);

    // 쿼리 스트링 형태로 두 개의 파라미터 생성 -> encodeURIComponent 사용해서 특수문자도 안전하게 변환
    const queryString = `keyword=${encodeURIComponent(searchText)}&sug=${encodeURIComponent(typoResult)}`;

    // 두 번째 파라미터로 쿼리 스트링 전달하여 페이지 이동
    nav(`/searchResult?${queryString}`);
  }

  const typoSuggestKeywords = async () => {
    setSuggestBool(!suggestBool);

    try {
      const response = await axios.get(`http://104.197.46.54/api/v1/search/typoSuggestKeywords?name=${searchText}`);

      if (response.status != 200) {
        return null;
      }

      if (response.data == '') {
        return null
      }

      console.log(response.data)
      return response.data[0].key;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  const historyKeywordFunc = () => {
    // 로컬 스토리지에서 기존 검색 기록을 가져옴.. 기존 기록이 없으면 빈 배열을 생성..
    const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // 중복 검사 후에만 추가
    if (!existingHistory.includes(searchText)) {
      // 새로운 검색어를 검색 기록 배열에 추가..
      existingHistory.push(searchText);
    }
    // 검색 기록 배열의 길이가 5개를 초과하면 첫 번째 항목을 삭제..
    if (existingHistory.length > 5) {
      existingHistory.shift();
    }

    // 업데이트된 검색 기록 배열을 다시 로컬 스토리지에 저장..
    localStorage.setItem('searchHistory', JSON.stringify(existingHistory));
  }

  const postRealTimeKeyWord = (text) => {
    axios.get(`http://104.197.46.54/api/v1/search/name?name=${text}`).then((res) => {

    }).catch((err) => {
      console.log(err);
    });
  }

  const handleHeaderRightImgClick = () => {
    searchFunc();
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchFunc();
    }
  };

  const textHandler = (e) => {
    setSearchText(e.target.value);

    axios.get(`http://104.197.46.54/api/v1/search/suggestKeywords?name=${e.target.value}`).then((res) => {
      setSearchSuggest(res.data);

    }).catch((err) => {
      console.log(err);
    });

  }

  const goToDetail = (data) => {
    setLoading(true);

    const storageData = {
      communityName : data.description,
      communityImgPath : data.profileImage,
      communityId : data.communityId
    }

    // localstorage 저장..
    saveToLocalStorage(storageData);

    setTimeout(() => {
      setLoading(false);
      nav(`/classDetail?detail=${data.communityId}`);
    }, 400);
  }

  const searchTextFunc = async (e) => {
    setLoading(true);

    await delay(700);

    // community 검색..
    searchCommunitys(e.target.innerText);

    // 검색한 단어를 실시간 검색어 집계에 반영..
    postRealTimeKeyWord(e.target.innerText);

  }

  const handleScroll = () => {
    // 스크롤 위치 계산
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 스크롤이 페이지 하단에 도달
    if (scrollTop + windowHeight + 1 >= documentHeight) {
      setPage(page + 1);
      setLoading(true);

        setTimeout(() => {
          setLoading(false);
          interestCommunityGet(menuName, page, 5).then((res) => {
            if(res.status === 200) {
              const newData = res.data.content;
              setCommunityList(prevData => [...prevData, ...newData]);
            }

          }).catch((err) => {

          })
        }, 500);
      }

  };

  return (
    <>
      <PC>
        <div className={classes.pcWrap} >
          <p className={classes.pcWrapInner}>화면을 550px 이하로 줄여 주세요.</p>
        </div>
      </PC>
      <Mobile>
        <div className={classes.searchWrap}>
          <div className={classes.searchHeader}>
            <div className={classes.headerLeftImg} onClick={backHandler}>
              <img src={back} />
            </div>
            <div className={classes.headerInputArea}>
              <input value={searchText} placeholder="검색어 입력" onKeyDown={handleInputKeyDown} onChange={textHandler} />
              {searchSuggest.length != 0 && <div style={{height : searchSuggest.length > 5 ?'60vw' : 'auto', overflowY : searchSuggest.length > 5 ? 'scroll' : 'auto'}} className={classes.suggestToolTip}>
                {searchSuggest.map((item, idx) => (
                  <div key={idx} className={classes.suggestToolTipItem}>
                    <img src={hot} />
                    <p>{item.key}</p>
                  </div>
                ))}
              </div>}
            </div>
            <div className={classes.headerRightImg} onClick={handleHeaderRightImgClick}>
              <img src={search} />
            </div>
          </div>
          {(keyword != sugKeyword && sugKeyword != '' && sugKeyword != null) && <p onClick={searchTextFunc} className={classes.suggestText}>검색어에 대한 추천 검색어 : <span>{sugKeyword}</span></p>}

          <div className={classes.searchResultArea}>
            <h2 className={classes.resultTitle}><span>{keyword != null ? keyword : interest}</span> (으)로 검색하신 결과</h2>
            {communityList.length == 0 ? <p className={classes.notData}>검색 결과가 없습니다.</p> : communityList.map((item, idx) => (
              <SuggestComunity padding="search" data={item} key={idx} onClick={() => goToDetail(item)} />
            ))}
          </div>


          {loading && <Loading />}
        </div>
      </Mobile>
    </>
  );
};

export default SearchResult;