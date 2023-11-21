import React, { useEffect, useState } from 'react';
import classes from '../../styles/pages/Search.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchRealTimeKeyWord = (props) => {
  const [realTimeKeyWord, setRealTimeKeyWord] = useState([]);
  const [sortedData, setSortedData] = useState(props.sortedData);
  const nav = useNavigate();


  useEffect(() => {
    getRealTimeKeyWord();
  }, [props.sortedData]);

  const getRealTimeKeyWord = () => {
    axios.get('http://34.123.156.208/api/v1/search/realTimeKeyword').then((res) => {
      const sortedData = res.data.sort((a, b) => b.count - a.count);
      setSortedData(sortedData);
    }).catch((err) => {
      console.log(err);
    });
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


  const searchCommunitys = (text) => {

    axios.get(`http:///34.123.156.208/api/v1/search/communitySearch?name=${text}`).then((res) => {

      if (res.status == 200) {

      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const postRealTimeKeyWord = (text) => {
    axios.get(`http://34.123.156.208/api/v1/search/name?name=${text}`).then((res) => {

    }).catch((err) => {
      console.log(err);
    });
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

  return (
    <div>
      <h2 className={classes.searchTitle}>실시간 인기 검색어</h2>
      <div>
        <div className={classes.historyKeywordArea}>
          {(sortedData != null && sortedData.length != 0) ? sortedData.map((item, idx) => (
            <div key={idx} className={classes.historyKeyword}>
              <div onClick={searchTextFunc} className={classes.historyKeywordLeft} style={{ height: '5vw' }}>
                <p>{item.key}</p>
              </div>
              <div className={classes.historyKeywordRight}>
                <p className={classes.historyKeywordCount}>{`${item.count}회`}</p>
                <p className={classes.historyKeywordCount}>(최근 1시간)</p>
              </div>
            </div>
          )) : <p className={classes.defaultMsg}>실시간 검색어가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchRealTimeKeyWord;