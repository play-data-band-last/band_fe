import React, {useEffect, useState} from 'react';
import myClasses from "../../../styles/pages/ClassDetail.module.css";
import newImg from "../../../asset/images/new.png";
import {scheduleInsert} from "../../../common/api/ApiPostService";
import {useSelector} from "react-redux";
import Loading from "../../atoms/Loading";
import classes from "../../../styles/pages/Main.module.css";
import addBtn from "../../../asset/images/add.png";
import {useNavigate} from "react-router-dom";

const ClassDetailMain = (props) => {
  const [dummy, setDummy] = useState([1,2,3])
  const [schedule, setSchedule] = useState(props.scheduleInfo);
  const [scheduleStates, setScheduleStates] = useState(dummy.map(() => false));
  const userInfo = useSelector(state => state.loginCheck.loginInfo);
  const [loading, setLoading] = useState(false);
  const [btnSwitch, setBtnSwitch] = useState(false);

  const nav = useNavigate();

  const scheduleHandler = (item, idx) => {
    const newScheduleStates = [...scheduleStates];
    newScheduleStates[idx] = !newScheduleStates[idx];
    setScheduleStates(newScheduleStates);

    props.setIsConfirmPopupOpen({ show: true, msg: '일정에 참여 하시겠습니까 ?', gb : 'scheduleInsert', data : item.id });
    // setBtnSwitch(!btnSwitch);
  }

  const communityInsertHandler = () => {

    props.setIsConfirmPopupOpen({ show: true, msg: '모임에 가입 하시겠습니까 ?', gb : 'community', data: '' });

  }

  const communityInsertCancelHandler = () => {
    props.setIsConfirmPopupOpen({ show: true, msg: '모임을 취소 하시겠습니까 ?', gb : 'communityCancel', data : '' });
  }

  function formatTimeToYYYYMMDDHHMM(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0F');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedTime = `${year}.${month}.${day} ${hours}:${minutes}`;

    return formattedTime;
  }

  function calculateDday(targetDate) {
    const today = new Date();
    const target = new Date(targetDate);

    // 로컬 타임존의 offset을 구합니다.
    const localTimeZoneOffset = today.getTimezoneOffset();
    const targetTimeZoneOffset = target.getTimezoneOffset();

    // 현재 날짜와 타겟 날짜에 offset을 적용합니다.
    const todayWithOffset = new Date(today.getTime() + (localTimeZoneOffset * 60 * 1000));
    const targetWithOffset = new Date(target.getTime() + (targetTimeZoneOffset * 60 * 1000));

    // 타겟 날짜와 현재 날짜의 차이를 밀리초 단위로 계산합니다.
    const timeDifference = targetWithOffset - todayWithOffset;

    // 밀리초를 일 단위로 변환합니다.
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 23));

    if (daysRemaining === 0) {
      return '오늘';
    } else if (daysRemaining > 0) {
      return `D-${daysRemaining}`;
    } else {
      return `D+${-daysRemaining}`;
    }
  }

  const scheduleAdd = () => {
    setLoading(true);
    let condition = false;

    for(const item of props.communityCount) {
      if (item.memberId == userInfo.userSeq) {
        condition = true;
      }
    }

    setTimeout(() => {
      setLoading(false);

      if(condition) {
        nav(`/createSchedule?communityId=${props.communitiyId}&interest=${props.communityInfo.interest}`);
      } else {
        props.setIsMsgPopupOpen({ show: true, msg: '모임에 참여 후 이용해 주세요.'});
      }

    }, 500);
  }


  return (
    <>
      <div className={myClasses.mainSwiperSection}>
        <div className={myClasses.background}>
          <div className={myClasses.classBackground}>
            <img src={props.communityInfo.profileImage} />
          </div>

          <div className={myClasses.tags}>
            <div className={myClasses.tagsItem}>독산동 클래스</div>
            <div className={myClasses.tagsItem}>{props.communityInfo.interest}</div>
            <div className={myClasses.tagsItem}>멤버 <span>{props.communityCount.length === 0 ? '없음' : props.communityCount.length}</span></div>
          </div>

          <div className={myClasses.descArea}>
            <h2>{props.communityInfo.name}</h2>

            <p className={myClasses.descAreaParam}>{props.communityInfo.description}</p>

            <div className={myClasses.insertBtnWrap}>
              {!props.isCommunityMember && <div onClick={communityInsertHandler} className={myClasses.insertBtn}><p>가입하기</p></div>}
              {props.isCommunityMember && <div onClick={communityInsertCancelHandler} className={myClasses.insertBtn}><p>취소하기</p></div>}

            </div>
          </div>


          <div className={myClasses.scheduleArea}>

            <div className={myClasses.scheduleAreaTitle}>
              <h2>일정</h2>
            </div>

            {props.scheduleInfo.length != 0 ? props.scheduleInfo.map((item, idx) => (
              <div key={idx} className={myClasses.scheduleWrap}>
                <div onClick={() => scheduleHandler(item, idx)} className={myClasses.scheduleBtn}><p>{btnSwitch ? '취소' : '참여'}</p></div>
                <div className={myClasses.scheduleItem}>

                  <div className={myClasses.topSchedule}>
                    <h2>{formatTimeToYYYYMMDDHHMM(item.scheduleTime)}</h2><p>{calculateDday(item.scheduleTime)}</p>
                  </div>

                  <div className={myClasses.secondSchedule}>
                    <p>{item.scheduleName}</p>
                  </div>

                  <div className={myClasses.descSchedule}>
                    <div>
                      <p>일시</p>
                      <p>{formatTimeToYYYYMMDDHHMM(item.scheduleTime)}</p>
                    </div>
                    <div>
                      <p>위치</p>
                      <p>{item.meetingPlace}</p>
                    </div>
                    <div>
                      <p>금액</p>
                      <p>월 회비 {item.price}원</p>
                    </div>
                    <div>
                      <p>참여</p>
                      <p><span>{item.participant}</span>/{item.maxParticipation} ({item.maxParticipation - item.participant}자리 남음)</p>
                    </div>
                  </div>
                </div>
              </div>
            )) : <p>등록된 일정이 없습니다.</p>}
            <div onClick={scheduleAdd} className={classes.createCommunity2}>
              <img src={addBtn} />
            </div>
          </div>

          <div className={myClasses.scheduleMember}>

            <div className={myClasses.scheduleAreaTitle}>
              <h2>모임 멤버 {props.communityCount.length == 0 ? `(${0})` : `(${props.communityCount.length})`}</h2>
            </div>

            <div className={myClasses.memberListWrap}>
              {props.communityCount.length != 0 ? props.communityCount.map((item, idx) => (
                <div key={idx} className={myClasses.memberProfile}>
                  <div className={myClasses.memberLeft}>
                    <img src={item.memberImage} />
                  </div>
                  <div className={myClasses.memberRight}>
                    <div className={myClasses.memberRightInner}>
                      <h2>{item.memberName}</h2>
                      <img src={newImg} />
                    </div>
                    <div>
                      <p>안녕하세요.</p>
                    </div>
                  </div>
                </div>
              )) : <p>가입된 멤버가 없습니다.</p>}


            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default ClassDetailMain;