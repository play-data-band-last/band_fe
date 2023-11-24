import React, {useEffect, useState} from 'react';
import {Mobile, PC} from "../../config/Responsive";
import MyPageHeader from "../Layout/MyPageHeader";
import FixedMenuBar from "../Layout/FixedMenuBar";
import classes from "../../../styles/pages/Main.module.css";
import myClasses from "../../../styles/pages/MyPage.module.css";
import set from "../../../asset/images/setblack.webp";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {findByMyReserve} from "../../../common/api/ApiGetService";
import MyClassCarousel from "../../blocks/MyClassCarousel";
import MyHistoryClassCarousel from "../../blocks/MyHistoryClassCarousel";
import Loading from "../../atoms/Loading";
import defaultImg from "../../../asset/images/defaultprofile.webp";

const MyPage = () => {
  const userInfo = useSelector(state => state.loginCheck.loginInfo);
  const nav = useNavigate();
  const [myReserveList, setMyReserveList] = useState([]);
  const [myCommunityHistory, setMyCommunityHistory] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    // if (!userInfo.isLogin) {
    //   nav('/');
    //   return;
    // };

    findByMyReserve(userInfo.userSeq).then((res) => {
      if (res.status === 200) {
        setMyReserveList(res.data);
      }
    }).catch((err) => {

    });

  }, []);

  const modifyMethod = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      nav('/modifyInfo');

    }, 500);
  }


  return (
    <div className={classes.fixedSpace}>
      <PC>
        <div className={classes.pcWrap} >
          <p className={classes.pcWrapInner}>화면을 550px 이하로 줄여 주세요.</p>
        </div>
      </PC>
      <Mobile>
        <MyPageHeader />

        <div className={myClasses.myArea}>
          <div className={myClasses.myAreaLeft}>
            <div className={myClasses.myProfileImg}>
              {userInfo.profileImgPath == null && <img className={myClasses.myProfileImgInner} src={defaultImg}/>}
              {userInfo.profileImgPath != null && <img className={myClasses.myProfileImgInner} src={userInfo.profileImgPath} />}
              <div onClick={modifyMethod} className={myClasses.modiImg}>
                <img src={set} />
              </div>
            </div>
          </div>
          <div className={myClasses.myAreaRight}>
            <h2>{userInfo.username}</h2>
            <p>
              <span>{userInfo.mbti}</span>
              {/*<span>1994.09.11</span>*/}
            </p>
          </div>
        </div>

        <div className={myClasses.mySubj}>
          <div className={myClasses.mySubjWrap}>
            {userInfo.interest.map((item, idx) => (
              <span key={idx} className={myClasses.mySubjWrapItem}>{item.interest}</span>
            ))}
          </div>
        </div>

        <div className={myClasses.myPageClassWrap}>
          <div><h2 className={myClasses.titleText}>찜한 모임</h2></div>
        </div>

        <div className={myClasses.slideWrap}>
          <MyClassCarousel data={myReserveList} />
        </div>

        <div className={myClasses.myPageClassWrap}>
          <div><h2 className={myClasses.titleText}>최근 본 모임</h2></div>
        </div>

        <div className={myClasses.slideWrap}>
          <MyHistoryClassCarousel />
        </div>

        {/* bottom={showFixedMenuBar ? '0' : '-20vw'} */}
        <FixedMenuBar />
        {loading && <Loading />}
      </Mobile>
    </div>
  );
};

export default MyPage;