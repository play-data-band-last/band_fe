import React, {useEffect, useRef, useState} from 'react';
import classes from "../../../styles/pages/ClassDetailChat.module.css";
import axios from "axios";
import {userChatMsg} from "../../../common/api/ApiPostService";
import {useSelector} from "react-redux";
import WebSocketComponent from "../../../common/WebSocketComponent";

const ClassDetailChat = (props) => {

  const [chatList, setChatList] = useState([]);
  const [timeData, setTimeData] = useState(false);
  const [msg, setMsg] = useState('');
  const isLogin = useSelector(state => state.loginCheck.loginInfo);
  const scrollRef = useRef();

  useEffect(() => {
    let fetchDataInterval;

    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.229:9090/api/v1/chattings', {
          params: {
            communityId: props.communitiyId
          }
        });

        setChatList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    fetchDataInterval = setInterval(() => {
      setTimeData((prevTimeData) => !prevTimeData);
    }, 3000);

    return () => {
       clearInterval(fetchDataInterval);
    };

  }, [timeData]);


  function formatTimeToAMPM(isoDate) {
    const date = new Date(isoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // AM 또는 PM 결정
    const ampm = hours >= 12 ? '오후' : '오전';

    // 12시간 형식으로 변환
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // 시, 분, 초를 두 자리 숫자로 포맷
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // 최종 형식: "hh:mm:ss AM" 또는 "hh:mm:ss PM"
    const formattedTime = `${ampm} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return formattedTime;
  }

  const sendChatHandler = () => {
    setMsg('');

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

    console.log(scrollRef.current.scrollTop)

    userChatMsg(props.communitiyId, isLogin.userSeq, isLogin.username, isLogin.profileImgPath, msg)
      .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err);
    })
  }

  const msgHandler = (e) => {
    setMsg(e.target.value);
  }

  return (
    <div ref={scrollRef} className={classes.mainSwiperSection}>
      <div className={classes.chatWrap}>
        <div className={classes.chatContents}>
          <div className={classes.chatDate}>
            <p>2023년 11월 24일 목요일</p>
          </div>
          {chatList.map((item, idx) => (
            <div key={idx}>
              {item.memberId !== isLogin.userSeq ? (<div className={classes.chattingItem}>
                                                <div className={classes.chattingImg}>
                                                  <div className={classes.img}>
                                                    <img src={item.memberImage} />
                                                  </div>
                                                </div>
                                                <div className={classes.chatRight}>
                                                  <p className={classes.name}>
                                                    {item.memberName}
                                                  </p>
                                                  <div className={classes.chatLeft}>
                                                    <div className={classes.chatLeftArea}>
                                                      <p>{item.content}</p>
                                                    </div>
                                                    <div className={classes.chatRightText}>
                                                      <p>{formatTimeToAMPM(item.createdAt)}</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>)
                                              :
                                              (<div className={classes.myChatHistory}>
                                                <div className={classes.spaceArea}></div>
                                                <div className={classes.myChatHistoryInner}>
                                                  <div className={classes.timeArea}>
                                                    <p>{formatTimeToAMPM(item.createdAt)}</p>
                                                  </div>
                                                  <div className={classes.myChatContents}>
                                                    <p>{item.content}</p>
                                                  </div>
                                                </div>
                                              </div>)
              }

            </div>
          ))}
          </div>
      </div>
      <div className={classes.inputArea}>
        <div className={classes.inputContentWrap}>
          <input value={msg} onChange={msgHandler} placeholder="채팅을 입력하세요." />
        </div>
        <div onClick={sendChatHandler} className={classes.inputBtn}>
          <div className={classes.inputBtnItem}><p>전송</p></div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailChat;