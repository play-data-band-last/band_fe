import React, {useEffect, useState} from 'react';
import classes from '../../styles/pages/Search.module.css';
import axios from "axios";
import history from "../../asset/images/history.png";

const SearchRealTimeKeyWord = () => {
  const [realTimeKeyWord, setRealTimeKeyWord] = useState([]);

  useEffect(() => {
    getRealTimeKeyWord();

    setTimeout(() => {
      getRealTimeKeyWord();
    }, 1000 * 30);


  }, []);

  const getRealTimeKeyWord = () => {
    axios.get('http://192.168.0.106:8080/api/v1/search/realTimeKeyword').then((res) => {
      const sortedData = res.data.sort((a, b) => b.count - a.count);
      setRealTimeKeyWord(sortedData);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <h2 className={classes.searchTitle}>실시간 인기 검색어</h2>
      <div>
        <div className={classes.historyKeywordArea}>
          {(realTimeKeyWord != null && realTimeKeyWord.length != 0) ? realTimeKeyWord.map((item, idx) => (
            <div key={idx} className={classes.historyKeyword}>
              <div className={classes.historyKeywordLeft} style={{height : '5vw'}}>
                <p>{item.key}</p>
              </div>
              <div className={classes.historyKeywordRight}>
                <p className={classes.historyKeywordCount}>{`${item.count}회 (최근 1시간)`}</p>
              </div>
            </div>
          )) : <p className={classes.defaultMsg}>실시간 검색어가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchRealTimeKeyWord;