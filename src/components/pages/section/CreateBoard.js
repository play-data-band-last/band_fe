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
import {boardInsert, BoardInsert, createCommunity, createSchedule} from "../../../common/api/ApiPostService";

const CreateBoard = () => {
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
  }, []);

  const signupHandler = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      boardInsert(communityId, userCateSub, userInfo.userSeq, userInfo.username, userInfo.profileImgPath, userLocation).then((res) => {

        if (res.status === 200) {
          setIsMsgPopupOpen({show: true, msg: '게시글이 생성 되었습니다.', gb: '1'});
        }

      }).catch((err) => {

      })


    }, 500);
  }

  const closeMsgPopup = (gb) => {

    if (isMsgPopupOpen.gb === '1') {
      nav(`/classDetail?detail=${communityId}&pageIdx=${1}`);
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

        <h2 style={{fontSize : '4vw', textAlign : 'center', fontWeight : '600', marginBottom : '5vw'}}>생성할 게시글의 정보를 입력해 주세요.</h2>


        <div className={classes.inputArea}>
          <Input onChange={locationHandler} placeholder="제목" value="게시글 제목" type="text" />
          <Input onChange={categorySubHandler} placeholder="내용" value="게시글 내용" type="text" />

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

export default CreateBoard;