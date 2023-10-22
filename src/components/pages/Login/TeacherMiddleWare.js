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
import {emailCheck, passCheck} from "../../../common/Reg";
import {findByTeacherLoginIngo, myTokenInfo} from "../../../common/api/ApiGetService";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {teacherLogin} from "../../../common/api/ApiPostService";
import {useDispatch} from "react-redux";
import {loginCheckAction} from "../../../ducks/loginCheck";

const TeacherMiddleWare = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authParam = urlParams.get('auth');


    axios.get('http://172.30.1.17:8080/api/v1/auth/me', {
      headers: {
        Authorization: `Bearer ${authParam}`
      }
    })
      .then((res) => {
        const data = res.data;

        teacherLogin(data.email, data.username)
        .then((res) => {

          // 회원 존재..
          if (res.data.status === "CONFLICT") {

            const loginInfo = {
              isLogin : true,
              id : data.email,
              username : data.username,
              profileImgPath : null,
              mbti : null,
              userSeq : null,
              interest : []
            }


            findByTeacherLoginIngo(data.email).then((res) => {

              loginInfo.token = res.data.token;
              loginInfo.userSeq = res.data.userId;
              loginInfo.profileImgPath = res.data.profileImgPath;
              loginInfo.mbti = res.data.mbti;
              loginInfo.interest = res.data.interests;
              loginInfo.username = res.data.username;

              dispatch(loginCheckAction.loginInfoSet(loginInfo));

              nav('/main');
            }).catch((err) => {

            });

            return ;
          }

          // 회원 존재 하지 않음..
          const teacherLoginInfo = {
            email : data.email,
            username : data.username
          }

          dispatch(loginCheckAction.teacherLoginInfoSet(teacherLoginInfo));

          nav('/authSignup');

        }).catch((err) => {
          console.log(err);
        })

      })
      .catch((err) => {
        console.log(err);
      });

    // myTokenInfo(authParam).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // })

  }, [])

  return (
    <div>
      <Loading />
    </div>
  );
};

export default TeacherMiddleWare;