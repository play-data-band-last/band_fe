import classes from "../../../styles/pages/Main.module.css";
import mainLogo from "../../../asset/images/mainlogo2.png";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import {useNavigate} from "react-router-dom";
import {Mobile, PC} from "../../config/Responsive";
import Loading from "../../atoms/Loading";
import {useState} from "react";
import PopupDom from "../../blocks/PopupDom";
import MsgPopup from "../../blocks/MsgPopup";
import ConfirmPopup from "../../blocks/ConfirmPopup";
import {emailCheck, passCheck} from "../../../common/Reg";
import {signup} from "../../../common/api/ApiPostService";
import {useDispatch} from "react-redux";
import {loginCheckAction} from "../../../ducks/loginCheck";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: ''});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: ''});
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userName, setUserName] = useState('');
  const [userMbti, setUserMbti] = useState('');
  const [userFile, setUserFile] = useState('');
  const [userId, setUserId] = useState('');
  const [userProfilePath, setUserProfilePath] = useState('');
  const [signupVisitPath, setSignupVisitPath] = useState('');
  const dispatch = useDispatch();

  // setIsConfirmPopupOpen({show: true, msg: '관심 상품으로 등록하시겠습니까?'});


  const loginMethods = () => {
    nav('/');
  }

  const signupHandler = () => {

    if (!emailCheck(userEmail)) {
      setIsMsgPopupOpen({show: true, msg: '아이디를 이메일형식으로 입력해 주세요.'});
      return ;
    }

    if (!passCheck(userPass)) {
      setIsMsgPopupOpen({show: true, msg: '비밀번호는 대,소문자 특수문자 포함 8글자 이상으로 입력해 주세요.'});
      return ;
    }

    if(userName == '') {
      setIsMsgPopupOpen({show: true, msg: '성함을 입력해 주세요.'});
      return ;
    }

    if(userMbti == '') {
      setIsMsgPopupOpen({show: true, msg: 'Mbti를 입력해 주세요.'});
      return ;
    }

    // if(userFile == '') {
    //   setIsMsgPopupOpen({show: true, msg: '프로필이미지를 등록해 주세요.'});
    //   return ;
    // }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      signup(userEmail, userPass, userName, userMbti, userProfilePath).then((res) => {

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

      }).catch((err) => {

        setIsMsgPopupOpen({show: true, msg: err.response.data.data.message});
        console.log(err);
      })

    }, 700);

  }

  const loginHandler = () => {
    nav('/');
  }

  const handleImageUpload = (e) => {
    // 선택한 파일
    console.log("업로드된 파일:", e.target.files[0]);

    setUserFile(e.target.files[0]);

  };

  const closeMsgPopup = () => {

    if (signupVisitPath != '') {
      nav(signupVisitPath);
    }

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

  const nameHandler = (e) => {
    setUserName(e.target.value);
  }

  const mbtiHandler = (e) => {
    setUserMbti(e.target.value);
  }

  const profileImgPathHandler = (e) => {
    setUserProfilePath(e.target.value);
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
        <div className={classes.inputArea}>
          <Input onChange={emailHandler} placeholder="example@email.com" value="아이디(이메일)" type="text" />
          <Input onChange={passHandler} placeholder="********" value="비밀번호" type="password" />
          <Input onChange={nameHandler} placeholder="홍길동" value="성함" type="text" />
          <Input onChange={profileImgPathHandler} placeholder="프로필 이미지 경로" value="프로필 이미지" type="text" />
          <Input onChange={mbtiHandler} placeholder="ENFJ" value="Mbti" type="text" />
          {/*<Input placeholder="" value="프로필 이미지" type="text" />*/}
          <Input
            placeholder="프로필 이미지"
            value="프로필 이미지"
            type="file"
            accept="image/*" // 이미지 파일만 허용
            onChange={(e) => handleImageUpload(e)}
          />
          <div className={classes.findArea}></div>
          <Button onClick={signupHandler} value="회원가입" />
        </div>
        <div className={classes.signupArea}>
          <div className={classes.signupAreaInner}>
            <span onClick={loginHandler}>이미 회원이신가요 ?</span>
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
      </Mobile>
    </div>
  );
}

export default Signup;