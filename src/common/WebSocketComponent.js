import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { findByMyCommunity } from "./api/ApiGetService";
import { useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { CommunityJoinMessage } from "../ducks/recoil";


const WebSocketComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const userInfo = useSelector(state => state.loginCheck.loginInfo);
  const [communityJoinMessage, setCommunityJoinMessage] = useRecoilState(CommunityJoinMessage);

  useEffect(() => {
    let communityIds = [];

    findByMyCommunity(userInfo.userSeq).then((res) => {
      if (res.status === 200) {
        communityIds = res.data.map((item) => item.communityId);;
      }
    }).catch((err) => {

    })


    // const socketUrl = `http://localhost:8081/stomp-endpoint?userId=${userInfo.id}`;
    // const socket = new SockJS(socketUrl);

    // WebSocket 연결 설정
    const socket = new SockJS(`http://localhost:8081/stomp-endpoint${userInfo.userSeq % 3}`); // WebSocket 서버 주소
    const stomp = Stomp.over(socket);

    stomp.connect({}, () => {
      // 연결이 성공하면 실행될 코드
      console.log('Connected to WebSocket');
      setStompClient(stomp);

      // communityIds.map((item, idx) => {
      //   stomp.subscribe(`/topic/notify/community/${item}`, (message) => {
      //     // 메시지가 도착했을 때 실행될 코드
      //     console.log(JSON.parse(message.body));
      //   });
      // })
      stomp.subscribe(`/topic/${userInfo.userSeq}`, (message) => {
        setCommunityJoinMessage(JSON.parse(message.body))
        console.log(communityJoinMessage)

      })
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