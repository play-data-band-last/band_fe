import React, {useEffect, useState} from 'react';
import classes from '../../styles/pages/Search.module.css';
import axios from "axios";

const SearchRealTimeKeyWord = (props) => {
  const [realTimeKeyWord, setRealTimeKeyWord] = useState([]);
  const [sortedData, setSortedData] = useState(props.sortedData);


  useEffect(() => {
    getRealTimeKeyWord();
  }, [props.sortedData]);

  const getRealTimeKeyWord = () => {
      axios.get('http://192.168.0.229:8080/api/v1/search/realTimeKeyword').then((res) => {
      const sortedData = res.data.sort((a, b) => b.count - a.count);
      setSortedData(sortedData);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <h2 className={classes.searchTitle}>실시간 인기 검색어</h2>
      <div>
        <div className={classes.historyKeywordArea}>
          {(sortedData != null && sortedData.length != 0) ? sortedData.map((item, idx) => (
            <div key={idx} className={classes.historyKeyword}>
              <div className={classes.historyKeywordLeft} style={{height : '5vw'}}>
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