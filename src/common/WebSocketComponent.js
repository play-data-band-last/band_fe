import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {findByMyCommunity} from "./api/ApiGetService";
import {useSelector} from "react-redux";
import axios from "axios";

const WebSocketComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const userInfo = useSelector(state => state.loginCheck.loginInfo);

  useEffect(() => {
    let communityIds = [];

    findByMyCommunity(userInfo.userSeq).then((res) => {
      if (res.status === 200) {
        communityIds = res.data.map((item) => item.communityId);;
      }
    }).catch((err) => {

    })

    // const calcUserNum = userInfo.userSeq % 3;
    //
    // console.log(calcUserNum)
    //


    // WebSocket 연결 설정
    // const socket = new SockJS(`http://localhost:900${calcUserNum}/stomp-endpoint-${calcUserNum}`); // WebSocket 서버 주소
    const socket = new SockJS(`http://localhost:9000/stomp-endpoint-0`); // WebSocket 서버 주소
    const stomp = Stomp.over(socket);

    stomp.connect({}, (frame) => {
      // 연결 성공 시 실행될 코드
      console.log('Connected to WebSocket');
      setStompClient(stomp);

      // communityIds.map((item, idx) => {
      //   stomp.subscribe(`/topic/notify/userId/${userInfo.userSeq}`, (message) => {
      //     // 메시지가 도착했을 때 실행될 코드
      //     console.log(JSON.parse(message.body));
      //   });
      // });

      communityIds.map((item, idx) => {
        stomp.subscribe(`/topic/notify/community/${item}`, (message) => {
          // 메시지가 도착했을 때 실행될 코드
          console.log(JSON.parse(message.body));
        });
      })
    }, (error) => {
      // 연결 실패 시 실행될 코드
      // 에러 처리 로직 추가
      console.log('연결안됨연결안됨연결안됨연결안됨연결안됨연결안됨연결안됨연결안됨연결안됨')
    });

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []); // 빈 배열을 두어서 컴포넌트가 마운트될 때만 이펙트가 실행되도록 합니다.

  return (
    <div>
    </div>
  );
};

export default WebSocketComponent;