import React, {useEffect, useState} from 'react';
import classes from "../../../styles/pages/Main.module.css";
import {Mobile, PC} from "../../config/Responsive";
import Loading from "../../atoms/Loading";
import mainLogo from "../../../asset/images/mainlogo2.png";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import PopupDom from "../../blocks/PopupDom";
import MsgPopup from "../../blocks/MsgPopup";
import ConfirmPopup from "../../blocks/ConfirmPopup";
import {passCheck} from "../../../common/Reg";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import CategorySelect from "../../blocks/CategorySelect";
import {categoryMenu} from "../../../common/Menus";
import {createCommunity, createSchedule} from "../../../common/api/ApiPostService";

const CreateSchedule = () => {
  const [userFile, setUserFile] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userCateSub, setUserCateSub] = useState('');
  const [userDesc, setUserDesc] = useState('');
  const [userImg, setUserImg] = useState('');
  const [userImg2, setUserImg2] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: '', gb : 0});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
  const nav = useNavigate();
  const [communityId, setCommunityId] = useState('');
  const [communityInterest, setCommunityInterest] = useState('');
  const userInfo = useSelector(state => state.loginCheck.loginInfo);

  useEffect(() => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    setCommunityId(urlParams.get('communityId'))
    setCommunityInterest(urlParams.get('interest'));

  }, []);

  const signupHandler = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      createSchedule(communityId, userLocation, convertToKoreanTime(userCateSub), userDesc, userImg, userImg2, communityInterest, userInfo.profileImgPath, userInfo.username).then((res) => {
        if (res.status === 200) {
          setIsMsgPopupOpen({show: true, msg: '일정이 생성 되었습니다.', gb: '1'});
        }
      }).catch((err) => {
        console.log(err);
      })
    }, 500);
  }

  function convertToKoreanTime(dateTimeString) {
    const koreanTime = new Date(dateTimeString);
    koreanTime.setHours(koreanTime.getHours() + 9); // 9시간 추가
    return koreanTime.toISOString();
  }

  const closeMsgPopup = (gb) => {

    if (isMsgPopupOpen.gb === '1') {
      nav(`/classDetail?detail=${communityId}`);
    }

    setIsMsgPopupOpen({show: false, msg: '', gb: '0'});
  }

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen({show: false, msg: ''});
  }

  const confirmHandler = () => {
    alert("asdsad")
  }

  const locationHandler = (e) => {
    setUserLocation(e.target.value);
  }

  const categorySubHandler = (e) => {
    setUserCateSub(e.target.value);
  }
  const descHandler = (e) => {
    setUserDesc(e.target.value);
  }
  const imgHandler = (e) => {
    setUserImg(e.target.value);
  }

  const imgHandler2 = (e) => {
    setUserImg2(e.target.value);
  }


  return (
    <div>
      <PC>
        <div className={classes.pcWrap} >
          <p className={classes.pcWrapInner}>화면을 550px 이하로 줄여 주세요.</p>
        </div>
      </PC>
      <Mobile>
        <div className={classes.signUpPageWrap}>
          <img className={classes.signUpPageLogo} src={mainLogo} />
        </div>

        <h2 style={{fontSize : '4vw', textAlign : 'center', fontWeight : '600', marginBottom : '5vw'}}>생성할 일정의 정보를 입력해 주세요.</h2>


        <div className={classes.inputArea}>
          <Input onChange={locationHandler} placeholder="1:1 피아노 과외 클래스" value="일정 이름" type="text" />
          <Input onChange={categorySubHandler} placeholder="2023/09/20 17:50" value="일정 시작 시간" type="text" />
          <Input onChange={descHandler} placeholder="서울시 강남구" value="일정 장소" type="text" />
          <Input onChange={imgHandler} placeholder="20000" value="일정 월 회비" type="text" />
          <Input onChange={imgHandler2} placeholder="50" value="일정 최대 인원 (최대 50)" type="text" />


          {/*<div className={classes.selectBoxArea}>*/}
          {/*  <p>소모임 카테고리</p>*/}
          {/*  <CategorySelect setCategory={setCategory} menuList={categoryMenu} />*/}
          {/*</div>*/}

          {/*<Input*/}
          {/*  placeholder="프로필 이미지"*/}
          {/*  value="프로필 이미지"*/}
          {/*  type="file"*/}
          {/*  accept="image/*" // 이미지 파일만 허용*/}
          {/*  onChange={(e) => handleImageUpload(e)}*/}
          {/*/>*/}
          <div className={classes.findArea}></div>
          <Button onClick={signupHandler} value="만들기" />
        </div>
        {loading && <Loading />}
        <div id='popupDom'>
          {isMsgPopupOpen.show && <PopupDom>
            <MsgPopup onClick={closeMsgPopup} msg={isMsgPopupOpen.msg} />
          </PopupDom>}
          {isConfirmPopupOpen.show && <PopupDom>
            <ConfirmPopup onConfirm={confirmHandler} onClick={closeConfirmPopup} msg={isConfirmPopupOpen.msg} />
          </PopupDom>}
        </div>
      </Mobile>
    </div>
  );
};

export default CreateSchedule;