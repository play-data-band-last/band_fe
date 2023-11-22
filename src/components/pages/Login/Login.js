import classes from "../../../styles/pages/Main.module.css";
import mainLogo from "../../../asset/images/mainlogo.webp";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../atoms/Loading";
import {loginCheckAction} from "../../../ducks/loginCheck";
import PopupDom from "../../blocks/PopupDom";
import MsgPopup from "../../blocks/MsgPopup";
import ConfirmPopup from "../../blocks/ConfirmPopup";
import {emailCheck, passCheck} from "../../../common/Reg";

import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../common/AuthContext";

const Login = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: ''});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.loginCheck.loginInfo.isLogin);



  // 페이지가 처음 로드될 때 스크롤을 가장 위로 이동
  useEffect(() => {

    // 로그인 상태라면 main 으로..
    if (isLogin) {
      nav('/main');
    }

    window.scrollTo(0, 0);
  }, [isLogin, nav]);
  const signUpMethods = () => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      nav('signUp');
    }, 700);

  }

  const loginSubmitHandler = () => {


    if (!emailCheck(userEmail)) {
      setIsMsgPopupOpen({show: true, msg: '아이디를 이메일형식으로 입력해 주세요.'});
      return ;
    }

    if (!passCheck(userPass)) {
      setIsMsgPopupOpen({show: true, msg: '비밀번호는 대,소문자 특수문자 포함 8글자 이상으로 입력해 주세요.'});
      return ;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      login(userEmail, userPass).then((res) => {
        // 로그인 성공

        if (res.isLogin) {
          // redux ( localStorage ) 저장..
          dispatch(loginCheckAction.loginInfoSet(res));
          nav('/main');
        } else {
          // 로그인 실패
          setIsMsgPopupOpen({show: true, msg: res.response.data.data.message});
        }

      }).catch((err) => {

        console.log(err);
      })


    }, 700);





  }

  const teacherAuth = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.href = 'http://172.30.1.17:3001';
    }, 700);

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

  const emailHandler = (e) => {
    setUserEmail(e.target.value);
  }

  const passHandler = (e) => {
    setUserPass(e.target.value);
  }

  return (
    <div>
      <div className={classes.mainPageWrap}>
        <img alt='img' className={classes.mainPageLogo} src={mainLogo} />
      </div>
      <div className={classes.inputArea}>
        <Input onChange={emailHandler} placeholder="example@email.com" value="아이디(이메일)" type="text" />
        <Input onChange={passHandler} placeholder="********" value="비밀번호" type="password" />
        <div className={classes.findArea}></div>
        <Button onClick={loginSubmitHandler} value="로그인" />

        {/*<Button onClick={teacherAuth} background="#F7E600" color="rgb(20, 22, 23)" value="Auth Server 로그인" />*/}
      </div>
      <div className={classes.signupArea}>
        <div className={classes.signupAreaInner}>
          <span onClick={signUpMethods}>회원이 아니신가요 ?</span>
        </div>
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
    </div>
  );
}

export default Login;