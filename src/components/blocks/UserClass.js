import React, {useEffect, useRef, useState} from 'react';
import classes from "../../styles/blocks/SuggestComunity.module.css";
import piano from "../../asset/images/piano.jpeg";
import {useNavigate} from "react-router-dom";
import {findByCommunitySchedule} from "../../common/api/ApiGetService";

const UserClass = (props) => {
  const nav = useNavigate();
  const [schedule, setSchedule] = useState([]);


  useEffect(() => {
    window.scrollTo(0, 0);

    findByCommunitySchedule(props.data.communityId).then((res) => {
      setSchedule(res.data);
      console.log(res.data)
    }).catch((err) => {

    })
  }, []);

  const backgroundRef = useRef();


  const suggestionClickMethod = (data) => {
    backgroundRef.current.style.background = 'rgb(229 226 226)';

    setTimeout(() => {
      backgroundRef.current.style.background = '#fff';
      nav(`/classDetail?detail=${data}`);
    }, 100);
  }

  function formatDateTime(dateTimeString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'long'
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleString('ko-KR', options);
    return formattedDateTime;
  }
  return (
    <div style={{marginBottom : '2vw'}}>
      <div ref={backgroundRef} onClick={() => suggestionClickMethod(props.data.communityId)} className={classes.suggestionArea}>
        <div className={classes.suggestionLeft}>
          <div className={classes.suggestionLeftInner}><img src={props.data.communityImage} /></div>
        </div>
        <div className={classes.suggestionRight}>
          <div className={classes.classRightInner}>
            <h2 className={classes.classTitle}>{props.data.communityName}</h2>
            <div className={classes.suggestionDetail}>
              <p className={classes.location}>강남구</p>
              <p className={classes.gb}>|</p>
              <p className={classes.member}>멤버 모집 중</p>
              <div style={{color : props.data.memberRole === '모임장' && '#ff0000'}} className={classes.cateWrap}><p>{props.data.memberRole}</p></div>
            </div>
          </div>
        </div>
      </div>
      {schedule.length != 0 ? schedule.map((item, idx) => (
        <p className={classes.schedule}>{formatDateTime(item.scheduleTime)} - {item.scheduleName}</p>
      )) : <p style={{padding : '0 3vw', color : '#8d8d8d', fontSize : '3vw'}}>등록된 일정 없음</p>}

    </div>
  );
};

export default UserClass;