import React, {useState} from 'react';
import classes from "../../../styles/pages/Main.module.css";
import {Mobile, PC} from "../../config/Responsive";
import Loading from "../../atoms/Loading";
import mainLogo from "../../../asset/images/mainlogo2.webp";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import PopupDom from "../../blocks/PopupDom";
import MsgPopup from "../../blocks/MsgPopup";
import ConfirmPopup from "../../blocks/ConfirmPopup";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import CategorySelect from "../../blocks/CategorySelect";
import {categoryMenu} from "../../../common/Menus";
import {createCommunity} from "../../../common/api/ApiPostService";

const CreateCommunity = () => {
  const [userFile, setUserFile] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userCateSub, setUserCateSub] = useState('');
  const [userDesc, setUserDesc] = useState('');
  const [userImg, setUserImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [category, setCategory] = useState('');
  const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: '', gb : 0});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
  const nav = useNavigate();
  const userInfo = useSelector(state => state.loginCheck.loginInfo);

  const handleImageUpload = (e) => {
    // 선택한 파일
    console.log("업로드된 파일:", e.target.files[0]);

    setUserFile(e.target.files[0]);

  };

  const signupHandler = () => {
    setLoading(true);
    setTimeout(() => {
      createCommunity(userInfo.userSeq, userInfo.username, userInfo.profileImgPath,  userName, userImg, userInfo.location, userCateSub, category, userDesc).then((res) => {
        setIsMsgPopupOpen({show: true, msg: '모임이 등록 되었습니다.', gb : '1'});
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
        console.log(err);
      })
    }, 500);

  }

  const closeMsgPopup = (gb) => {

    if (isMsgPopupOpen.gb === '1') {
      nav('/main');
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

  const nameHandler = (e) => {
    setUserName(e.target.value);
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

        <h2 style={{fontSize : '4vw', textAlign : 'center', fontWeight : '600', marginBottom : '5vw'}}>생성할 모임정보를 입력해 주세요.</h2>


        <div className={classes.inputArea}>
          <Input onChange={nameHandler} placeholder="달리자 러닝 크루!" value="소모임 이름" type="text" />
          <Input onChange={locationHandler} placeholder="서울" value="소모임 지역" type="text" />
          <Input onChange={categorySubHandler} placeholder="러닝 모임" value="소모임 목적" type="text" />
          <Input onChange={descHandler} placeholder="러닝을 좋아하는 모임입니다." value="소모임 내용" type="text" />
          <Input onChange={imgHandler} placeholder="이미지 URL" value="소모임 이미지" type="text" />


          <div className={classes.selectBoxArea}>
            <p>소모임 카테고리</p>
            <CategorySelect setCategory={setCategory} menuList={categoryMenu} />
          </div>

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

export default CreateCommunity;