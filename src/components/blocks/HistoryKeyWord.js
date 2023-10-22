import React, {useEffect, useState} from 'react';
import classes from '../../styles/pages/Search.module.css';
import history from '../../asset/images/history.png';

const HistoryKeyWord = (props) => {
  // 로컬 스토리지에서 기존 검색 기록을 가져옴.. 기존 기록이 없으면 빈 배열을 생성..
  const [historyKeyWord, setHistoryKeyWord] = useState([]);

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

  return (
    <div>
      <h2 className={classes.searchTitle}>최근 검색어</h2>
      <div>
        <div className={classes.historyKeywordArea}>
          {(historyKeyWord != null && historyKeyWord.length != 0) ? historyKeyWord.map((item, idx) => (
            <div key={idx} className={classes.historyKeyword}>
              <div className={classes.historyKeywordLeft}>
                <img src={history} />
                <p>{item}</p>
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