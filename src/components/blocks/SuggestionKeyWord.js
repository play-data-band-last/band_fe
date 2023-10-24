import React from 'react';
import classes from '../../styles/pages/Search.module.css';

const SuggestionKeyWord = () => {
  return (
    <div>
      <h2 className={classes.searchTitle}>추천 검색어</h2>
      <div className={classes.suggestionWrap}>
        <div className={classes.suggestItem}>헬스</div>
        <div className={classes.suggestItem}>헬창</div>
        <div className={classes.suggestItem}>크로스핏</div>
        <div className={classes.suggestItem}>노래</div>
        <div className={classes.suggestItem}>보컬</div>
        <div className={classes.suggestItem}>방송댄스</div>
        <div className={classes.suggestItem}>골프모임</div>
        <div className={classes.suggestItem}>미친볼링</div>
      </div>
    </div>
  );
};

export default SuggestionKeyWord;