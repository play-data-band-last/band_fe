import React, {useRef} from 'react';
import classes from "../../styles/blocks/SuggestComunity.module.css";
import piano from "../../asset/images/piano.jpeg";

const SuggestSchedule = (props) => {
  const backgroundRef = useRef();

  const suggestionClickMethod = () => {
    backgroundRef.current.style.background = 'rgb(229 226 226)';

    setTimeout(() => {
      backgroundRef.current.style.background = '#fff';
      props.onClick();
    }, 100);
  }

  function formatDateTime(dateTimeString) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDateTime = new Date(dateTimeString).toLocaleString('en-US', options);
    return formattedDateTime;
  }

  return (
    <div ref={backgroundRef} onClick={suggestionClickMethod} className={classes.suggestionScheduleArea}>
      <div className={classes.suggestionScheduleAreaInner}>
        <div className={classes.suggestionScheduleAreaInnerAb}>
          <div className={classes.abInner}>
            <p>오늘</p>
            <p>{formatDateTime(props.data.scheduleTime)}</p>
          </div>
        </div>
        <div className={classes.suggestionLeft}>
          <div className={classes.suggestionLeftInner}><img src={props.data.memberImage} /></div>
        </div>
        <div className={classes.suggestionRight}>
          <div className={classes.suggestionRightInner}>
            <h2 className={classes.suggestionTitle}>{props.data.scheduleName}</h2>
            <p className={classes.suggestionDesc}>Since 1998</p>
            <div className={classes.suggestionDetail}>
              <p className={classes.location}>{props.data.meetingPlace}</p>
              <p className={classes.gb}>|</p>
              <p className={classes.member}>참여 <span style={{color: 'red'}}>{props.data.participant}</span>/{props.data.maxParticipation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestSchedule;