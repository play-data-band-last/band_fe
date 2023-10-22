import React, {useState} from 'react';
import classes from '../../../styles/pages/Search.module.css';
import back from '../../../asset/images/back.png';
import search from '../../../asset/images/search.png';
import {useNavigate} from "react-router-dom";
import SearchRealTimeKeyWord from "../../blocks/SearchRealTimeKeyWord";
import HistoryKeyWord from "../../blocks/HistoryKeyWord";
import SuggestionKeyWord from "../../blocks/SuggestionKeyWord";
import SuggestComunity from "../../blocks/SuggestComunity";
import {categoryMenu} from "../../../common/Menus";
import Category from "../../blocks/Category";
import {interestCommunityGet} from "../../../common/api/ApiGetService";
import Loading from "../../atoms/Loading";
import axios from "axios";

const Search = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectMenuName, setSelectMenuName] = useState('');
  const [observer, setObserver] = useState(false);
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

    setObserver(!observer);


  }

  const postRealTimeKeyWord = () => {
    axios.get(`http://192.168.0.106:8080/api/v1/search/name?name=${searchText}`).then((res) => {
      console.log(res);
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
  }

  return (
    <div className={classes.searchWrap}>
      <div className={classes.searchHeader}>
        <div className={classes.headerLeftImg} onClick={backHandler}>
          <img src={back} />
        </div>
        <div className={classes.headerInputArea}>
          <input value={searchText} placeholder="검색어 입력" onKeyDown={handleInputKeyDown} onChange={textHandler} />
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
          <SearchRealTimeKeyWord />
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
  );
};

export default Search;