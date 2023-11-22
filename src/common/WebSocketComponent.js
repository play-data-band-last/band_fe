import React, {useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {useSelector} from "react-redux";

const WebSocketComponent = (props) => {
  const [stompClient, setStompClient] = useState(null);
  const userInfo = useSelector(state => state.loginCheck.loginInfo);

  useEffect(() => {
    let communityIds = [];
    // findByMyCommunity(userInfo.userSeq).then((res) => {
    //   if (res.status === 200) {
    //     communityIds = res.data.map((item) => item.communityId);
    //   }
    // }).catch((err) => {
    //
    // })

    // WebSocket 연결 설정
    // const socket = new SockJS(`http://localhost:900${calcUserNum}/stomp-endpoint-${calcUserNum}`); // WebSocket 서버 주소
    const socket = new SockJS(`http://104.197.46.54/stomp-endpoint-0`);
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
      //console.log(communityIds)
      communityIds.map((item, idx) => {
        stomp.subscribe(`/topic/notify/community/${item}`, (message) => {
          // 메시지가 도착했을 때 실행될 코드
          props.socketData(JSON.parse(message.body));
          //console.log(JSON.parse(message.body));

          // 이 부분에서 반환값을 명시적으로 지정하거나, 값을 반환하지 않아도 됩니다.
          return null; // 또는 원하는 값을 반환하거나, 아무 값도 반환하지 않음
        });
      });
    }, (error) => {
      // 연결 실패 시 실행될 코드
      // 에러 처리 로직 추가
      console.log('socket disconnect...');
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