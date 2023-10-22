import React from 'react';
import classes from '../../styles/pages/Search.module.css';

const SuggestionKeyWord = () => {
  return (
    <div>
      <h2 className={classes.searchTitle}>추천 검색어</h2>
      <div className={classes.suggestionWrap}>
        <div className={classes.suggestItem}>헬스</div>
      </div>
    </div>
  );
};

export default SuggestionKeyWord;