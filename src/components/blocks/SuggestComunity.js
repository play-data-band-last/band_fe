import React, {useRef} from 'react';
import classes from "../../styles/blocks/SuggestComunity.module.css";
import piano from "../../asset/images/piano.jpeg";

const SuggestComunity = (props) => {

  const backgroundRef = useRef();

  const suggestionClickMethod = () => {
    backgroundRef.current.style.background = 'rgb(229 226 226)';

    setTimeout(() => {
      backgroundRef.current.style.background = '#fff';
      props.onClick();
    }, 100);
  }

  return (
    <div style={{padding : props.padding == 'search' ? '4vw 0' : '4vw 3vw'}} ref={backgroundRef} onClick={suggestionClickMethod} className={classes.suggestionArea}>
      <div className={classes.suggestionLeft}>
        <div className={classes.suggestionLeftInner}><img src={props.data != undefined && props.data.profileImage} /></div>
      </div>
      <div className={classes.suggestionRight}>
        <div className={classes.suggestionRightInner}>
          <h2 className={classes.suggestionTitle}>{props.data != undefined && props.data.name}</h2>
          <p className={classes.suggestionDesc}>Since 1998</p>
          <div className={classes.suggestionDetail}>
            <p className={classes.location}>강남구</p>
            <p className={classes.gb}>|</p>
            <p className={classes.member}>멤버&nbsp;<span>{props.data.memberCount == 0 ? '모집 중' : props.data.memberCount}</span></p>
            <div className={classes.cateWrap}><p>{props.data != undefined && props.data.interest}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestComunity;