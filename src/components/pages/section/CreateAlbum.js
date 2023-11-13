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
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {albumInsert} from "../../../common/api/ApiPostService";

const CreateAlbum = () => {
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
  const [userFile, setUserFile] = useState('');

  useEffect(() => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    setCommunityId(urlParams.get('communityId'))
  }, []);

  const signupHandler = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      albumInsert(communityId, userInfo.userSeq, userInfo.username, userInfo.profileImgPath, userLocation, 0).then((res) => {
        if (res.status === 200) {
          setIsMsgPopupOpen({show: true, msg: '사진첩이 생성 되었습니다.', gb: '1'});
        }
      }).catch((err) => {
      })


    }, 500);
  }

  const closeMsgPopup = (gb) => {

    if (isMsgPopupOpen.gb === '1') {
      nav(`/classDetail?detail=${communityId}&pageIdx=${2}`);
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

  const handleImageUpload = (e) => {
    // 선택한 파일
    console.log("업로드된 파일:", e.target.files[0]);

    setUserFile(e.target.files[0]);

  };

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

        <h2 style={{fontSize : '4vw', textAlign : 'center', fontWeight : '600', marginBottom : '5vw'}}>생성할 사진의 URL을 입력해 주세요.</h2>


        <div className={classes.inputArea}>
          <Input onChange={locationHandler} placeholder="제목" value="이미지 URL" type="text" />
          <Input
            placeholder="프로필 이미지"
            value="프로필 이미지"
            type="file"
            accept="image/*" // 이미지 파일만 허용
            onChange={(e) => handleImageUpload(e)}
          />
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

export default CreateAlbum;