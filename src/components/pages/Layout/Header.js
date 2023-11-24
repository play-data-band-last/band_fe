import noti from "../../../asset/images/noti.webp";
import check from "../../../asset/images/check.webp";
import search from "../../../asset/images/search.webp";
import classes from "../../../styles/pages/Header.module.css";
import {useNavigate} from "react-router-dom";
import useCurrentLocation from "../../../common/useCurrentLocation";
import positionOptions from "../../../common/positionOptions";
import {useCallback, useEffect, useRef, useState} from "react";
import WebSocketComponent from "../../../common/WebSocketComponent";
import {useSelector} from "react-redux";
import axios from "axios";
import Loading from "../../atoms/Loading";
import {userLocationSave, userNotifyChangeRead} from "../../../common/api/ApiPostService";
import {findByMyNotifys} from "../../../common/api/ApiGetService";

const Header = () => {
  const nav = useNavigate();
  const {testLocation, error} = useCurrentLocation(positionOptions);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [showNotify, setShowNotify] = useState(false);
  const [notifyList, setNotifyList] = useState([]);
  const [notifyListLength, setNotifyListLength] = useState(0);
  const [observer, setObserver] = useState(false);
  const toolTipRef = useRef();
  const userInfo = useSelector(state => state.loginCheck.loginInfo);
  const [loading, setLoading] = useState(false);

  // 위치 가까운곳..까지 받아오기
  // useEffect(() => {
  //
  //
  //   if (testLocation) {
  //     const { latitude, longitude, accuracy } = testLocation;
  //     setLatitude(latitude);
  //     setLongitude(longitude);
  //     setAccuracy(Math.floor(accuracy));
  //
  //     userLocationSave(userInfo.userSeq, `${latitude}, ${longitude}`).then((res) => {
  //       console.log(res.data)
  //     }).catch((err) => {
  //
  //     })
  //   }
  //
  // }, [userInfo.userSeq, testLocation]);

  useEffect(() => {
    // 내 알림 내역 가져오기..
    findByMyNotifys(userInfo.userSeq).then((res) => {
      if (res.status === 200) {
        setNotifyListLength(res.data.length);
        setNotifyList(res.data);
      }
    }).catch((err) => {
      console.log(err);
    })

  }, [observer])

  useEffect(() => {
    //sse
    const eventSource = new EventSource(`http://104.197.46.54/notifications/subscribe/${userInfo.userSeq}`);

    const handleSSE = (event) => {
      const notifyData = event.data;

      if (!notifyData.includes('EventStream Created')) {
        setNotifyList(prevState => [...prevState, JSON.parse(event.data)]);
        setNotifyListLength(prevState => prevState + 1);
      }
    };

    // 이벤트 리스너 등록
    eventSource.addEventListener('sse', handleSSE);

    // 컴포넌트가 언마운트될 때 이벤트 소스 정리
    return () => {
      eventSource.removeEventListener('sse', handleSSE);
      eventSource.close();
    };
  }, []);


  const handleClickOutside = useCallback((event) => {
    if (toolTipRef.current && !toolTipRef.current.contains(event.target)) {
      toolTipRef.current.style.height = '0';
      toolTipRef.current.style.visibility = 'hidden';
      toolTipRef.current.style.opacity = '0';
      setShowNotify(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);


  const goToSearchPage = () => {
    nav('/search');
  }

  const showNotifyToolTip = (e) => {
    e.stopPropagation();

    // read 반전 요청..



    setNotifyListLength(0);
    if (showNotify) {
      toolTipRef.current.style.height = '0';
      toolTipRef.current.style.visibility = 'hidden';
      toolTipRef.current.style.opacity = '0';
    } else {
      toolTipRef.current.style.height = '60vw';
      toolTipRef.current.style.visibility = 'visible';
      toolTipRef.current.style.opacity = '100%';
    }

    setShowNotify(!showNotify);
  }

  // const socketData = (msg) => {
  //
  //   setNotifyListLength((prevNotifyListLength) => {
  //     const lastLength = prevNotifyListLength + 1;
  //
  //     return lastLength;
  //   });
  //
  //   setNotifyList(prevNotifyList => {
  //     // 새로운 메시지를 추가한 새로운 배열을 만듭니다.
  //     const updatedNotifyList = [...prevNotifyList, msg];
  //
  //     // 계산된 새로운 배열을 반환하여 상태를 업데이트합니다.
  //     return updatedNotifyList;
  //   });
  //
  // }

  const formatDate = (originalDate) => {
    if (originalDate === undefined) {
      return '';
    }
    const parsedDate = new Date(originalDate);

    parsedDate.setHours(parsedDate.getHours() - 6);

    const options = {
      // year: "numeric",
      // month: "2-digit",
      // day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      // weekday: "short",
    };

    return new Intl.DateTimeFormat("ko-KR", options).format(parsedDate);
  }

  const readChange = (data) => {
    setLoading(true);
    console.log(data)


    setTimeout(() => {
      setLoading(false);

      userNotifyChangeRead(data.id).then((res) => {
        // setObserver(!observer);
        nav(`/classDetail?detail=${data.memberId}&ownerId=${data.ownerId}`);
      }).catch((err) => {
        console.log(err);
      })

      // axios.post(`http://104.197.46.54/api/v1/notify/chageRead/${data.id}`).then((res) => {
      //   // res
      //
      //   setObserver(!observer);
      // }).catch((err) => {
      //     // err
      // })

    }, 500);
  }

  return (
    <header>
      <div className={classes.headerWrap}>
        <div style={{position :'relative'}} className={classes.headerLeft}>
          {accuracy !== 0 && <p className={classes.headerLeftText}>{`${latitude}, ${longitude}`}</p>}
          {accuracy !== 0 && <span style={{position : 'absolute', top: '6vw', left : '0', color : '#adb3b6', fontSize : '3vw'}}>{`약 ${accuracy.toLocaleString()} M 차이가 있습니다.`}</span>}
          {accuracy === 0 && <p>위치 정보 수집중..</p>}
        </div>
        <div className={classes.headerRight}>
          <img alt='img' onClick={goToSearchPage} className={classes.notiImg} src={search} />
          <img alt='img' onClick={showNotifyToolTip} className={classes.notiImg} src={noti} />
          {/*{notifyList.length != 0 && <div onClick={showNotifyToolTip} className={classes.notifyLength}>*/}
          {/*  <p>{notifyList.length}</p>*/}
          {/*</div>}*/}
          {notifyListLength !== 0 &&<div onClick={showNotifyToolTip} className={classes.notifyLength}>
            <p>{notifyListLength}</p>
          </div>}
          <div ref={toolTipRef} className={classes.notifyArea}>
            {notifyList.length !== 0 ?notifyList.map((item, idx) => (
              <div onClick={() => {readChange(item)}} key={idx} className={classes.notifyAreaItem}>
                <div className={classes.notifyAreaItemLeft}>
                  <div className={classes.notifyAreaItemLeftImg}>
                    <img alt='img' src={item.memberProfileImg} />
                  </div>
                </div>
                <div className={classes.notifyAreaItemRight}>
                  <p className={classes.notifyAreaItemRightParam}><span>{item.memberName}</span> 님 께서 <span>{item.communityName}</span> 모임에 가입하셨습니다. <span className={classes.dateSpan}>{`(${formatDate(item.currTime)})`}</span></p>
                  {item.read !== false ? <img alt='img'  src={check} className={classes.checkImg} /> : ''}
                </div>
              </div>
            )) : <p className={classes.notNotify}>알림 내역이 없습니다.</p>}
          </div>

        </div>
      </div>
      {/*<WebSocketComponent socketData={socketData} />*/}
      {loading && <Loading />}
    </header>
  )
}

export default Header;