import React, {useEffect, useState} from 'react';
import classes from '../../styles/pages/Search.module.css';
import history from '../../asset/images/history.png';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HistoryKeyWord = (props) => {
  // 로컬 스토리지에서 기존 검색 기록을 가져옴.. 기존 기록이 없으면 빈 배열을 생성..
  const [historyKeyWord, setHistoryKeyWord] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    setHistoryKeyWord(JSON.parse(localStorage.getItem('searchHistory')));
  }, [props.observer])

  const removeHistoryKeyWord = (keyword) => {
    // 로컬 스토리지에서 기존 검색 기록을 가져옴
    const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // 기존 검색 기록에서 특정 키워드와 일치하는 값을 제거
    const updatedHistory = existingHistory.filter(item => item !== keyword);

    // 업데이트된 검색 기록을 다시 로컬 스토리지에 저장
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    // 상태를 업데이트하여 화면을 다시 렌더링
    setHistoryKeyWord(updatedHistory);
  }

  const searchTextFunc = async (e) => {

    // community 검색..
    searchCommunitys(e.target.innerText);

    // 검색한 단어를 실시간 검색어 집계에 반영..
    postRealTimeKeyWord(e.target.innerText);

    // localStorage 쪽 최근 검색어 함수..
    historyKeywordFunc(e.target.innerText);

    // 쿼리 스트링 형태로 두 개의 파라미터 생성 -> encodeURIComponent 사용해서 특수문자도 안전하게 변환
    const queryString = `keyword=${encodeURIComponent(e.target.innerText)}&sug=`;

    // 두 번째 파라미터로 쿼리 스트링 전달하여 페이지 이동
    nav(`/searchResult?${queryString}`);

  }

  const historyKeywordFunc = (text) => {
    // 로컬 스토리지에서 기존 검색 기록을 가져옴.. 기존 기록이 없으면 빈 배열을 생성..
    const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // 중복 검사 후에만 추가
    if (!existingHistory.includes(text)) {
      // 새로운 검색어를 검색 기록 배열에 추가..
      existingHistory.push(text);
    }
    // 검색 기록 배열의 길이가 5개를 초과하면 첫 번째 항목을 삭제..
    if (existingHistory.length > 5) {
      existingHistory.shift();
    }

    // 업데이트된 검색 기록 배열을 다시 로컬 스토리지에 저장..
    localStorage.setItem('searchHistory', JSON.stringify(existingHistory));
  }

  const searchCommunitys = (text) => {

    axios.get(`http://localhost:8080/api/v1/search/communitySearch?name=${text}`).then((res) => {

      if(res.status == 200) {

      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const postRealTimeKeyWord = (text) => {
    axios.get(`http://192.168.0.229:8080/api/v1/search/name?name=${text}`).then((res) => {

    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <h2 className={classes.searchTitle}>최근 검색어</h2>
      <div>
        <div className={classes.historyKeywordArea}>
          {(historyKeyWord != null && historyKeyWord.length != 0) ? historyKeyWord.map((item, idx) => (
            <div key={idx} className={classes.historyKeyword}>
              <div className={classes.historyKeywordLeft}>
                <img src={history} />
                <p onClick={searchTextFunc}>{item}</p>
              </div>
              <div className={classes.historyKeywordRight} onClick={() => {removeHistoryKeyWord(item)}}>
                <p>×</p>
              </div>
            </div>
          )) : <p className={classes.defaultMsg}>최근 검색어가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default HistoryKeyWord;