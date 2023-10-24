import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/Search.module.css';
import back from '../../../asset/images/back.png';
import hot from '../../../asset/images/hot.png';
import search from '../../../asset/images/search.png';
import {useNavigate} from "react-router-dom";
import SearchRealTimeKeyWord from "../../blocks/SearchRealTimeKeyWord";
import HistoryKeyWord from "../../blocks/HistoryKeyWord";
import SuggestionKeyWord from "../../blocks/SuggestionKeyWord";
import {categoryMenu} from "../../../common/Menus";
import Category from "../../blocks/Category";
import Loading from "../../atoms/Loading";
import axios from "axios";
import {Mobile, PC} from "../../config/Responsive";

const Search = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectMenuName, setSelectMenuName] = useState('');
  const [observer, setObserver] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [searchSuggest, setSearchSuggest] = useState([]);

  const backHandler = () => {
    nav('/main');
  }

  const categoryClickMethod = (menuName) => {
    setLoading(true);
    setSelectMenuName(menuName);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  const searchFunc = () => {
    postRealTimeKeyWord();
    setSearchText('');

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

  const postRealTimeKeyWord = () => {
    axios.get(`http://192.168.0.229:8080/api/v1/search/name?name=${searchText}`).then((res) => {
      setObserver(!observer);

      setTimeout(() => {
        axios.get('http://192.168.0.229:8080/api/v1/search/realTimeKeyword').then((res) => {
          const sortedData = res.data.sort((a, b) => b.count - a.count);
          setSortedData(sortedData);
        }).catch((err) => {
          console.log(err);
        });
      }, 5000);


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

    axios.get(`http://localhost:8080/api/v1/search/suggestKeywords?name=${e.target.value}`).then((res) => {
      setSearchSuggest(res.data);

    }).catch((err) => {
      console.log(err);
    });


  }

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
              {searchSuggest.length != 0 && <div className={classes.suggestToolTip}>
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
          <div className={classes.searchArea}>
            <div className={classes.searchLeftArea}>
              <HistoryKeyWord observer={observer} />
            </div>
            <div className={classes.searchRightArea}>
              <SearchRealTimeKeyWord sortedData={sortedData} />
            </div>
          </div>
          <div className={classes.suggestionArea}>
            <SuggestionKeyWord />
          </div>
          <div className={classes.category}>
            {categoryMenu.map((item, idx) => (
              <div onClick={() => {categoryClickMethod(item.menuName)}} key={idx} className={classes.categoryAreaWrap}>
                <Category mb='2vw' textWidth='auto' color='#333' width='13vw' height='13vw' imgPath={item.imgPath} value={item.menuName} />
              </div>
            ))}
          </div>
          {loading && <Loading />}
        </div>
      </Mobile>
    </>
  );
};

export default Search;