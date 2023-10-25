import React, {useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../../../common/api/ApiPostService";
import {loginCheckAction} from "../../../ducks/loginCheck";

const TeacherSignup = () => {
  const [userPass, setUserPass] = useState('');
  const [userMbti, setUserMbti] = useState('');
  const [userFile, setUserFile] = useState('');
  const [imgState, setImgState] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: ''});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
  const nav = useNavigate();
  const teacherLoginInfo = useSelector(state => state.loginCheck.teacherLoginInfo);
  const dispatch = useDispatch();



  const passHandler = (e) => {
    setUserPass(e.target.value);
  }
  const mbtiHandler = (e) => {
    setUserMbti(e.target.value);
  }

  const handleImageUpload = (e) => {
    // 선택한 파일
    console.log("업로드된 파일:", e.target.files[0]);

    setUserFile(e.target.files[0]);

  };

  const signupHandler = () => {

    if (!passCheck(userPass)) {
      setIsMsgPopupOpen({show: true, msg: '비밀번호는 대,소문자 특수문자 포함 8글자 이상으로 입력해 주세요.'});
      return ;
    }

    if(userMbti === '') {
      setIsMsgPopupOpen({show: true, msg: 'Mbti를 입력해 주세요.'});
      return ;
    }

    // if(userFile === '') {
    //   setIsMsgPopupOpen({show: true, msg: '프로필이미지를 등록해 주세요.'});
    //   return ;
    // }

    signup(teacherLoginInfo.email, userPass, teacherLoginInfo.username, userMbti, imgState).then((res) => {
      setLoading(true);


      setTimeout(() => {
        setLoading(false);

        // 회원가입 성공 시..
        if (res.data.status == "success") {

          const loginInfo = {
            isLogin : false,
            id : null,
            username : null,
            profileImgPath : null,
            mbti : null,
            userSeq : res.data.data
          }

          dispatch(loginCheckAction.loginInfoSet(loginInfo));

          nav('/category');
        }


        //nav('/main');
      }, 500);
    }).catch((err) => {

    })


    // axios.post('http://192.168.0.229:8000/api/v1/user', {
    //   email : teacherLoginInfo.email,
    //   password : userPass,
    //   name : teacherLoginInfo.username,
    //   mbti : userMbti
    // }).then((res) => {
    //
    //
    // }).catch((err) => {
    //
    // })

  }
  const closeMsgPopup = () => {
    setIsMsgPopupOpen({show: false, msg: ''});
  }

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen({show: false, msg: ''});
  }

  const confirmHandler = () => {
    alert("asdsad")
  }

  const imgHandler = (e) => {
    setImgState(e.target.value);
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

        <h2 style={{fontSize : '4vw', textAlign : 'center', fontWeight : '600', marginBottom : '5vw'}}>추가 정보를 저장해 주세요.</h2>


        <div className={classes.inputArea}>
          <Input onChange={passHandler} placeholder="********" value="비밀번호" type="password" />
          <Input onChange={mbtiHandler} placeholder="ENFJ" value="Mbti" type="text" />
          <Input onChange={imgHandler} placeholder="프로필 이미지 URL" value="프로필 이미지 URL" type="text" />
          <Input
            placeholder="프로필 이미지"
            value="프로필 이미지"
            type="file"
            accept="image/*" // 이미지 파일만 허용
            onChange={(e) => handleImageUpload(e)}
          />
          <div className={classes.findArea}></div>
          <Button onClick={signupHandler} value="저장" />
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

export default TeacherSignup;