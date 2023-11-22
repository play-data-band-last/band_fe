import React from 'react';
import classes from "../../../styles/pages/FixedMenuBar.module.css";
import home from "../../../asset/images/home.webp";
import mypage from "../../../asset/images/mypage.webp";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const FixedMenuBar = (props) => {
  const userInfo = useSelector(state => state.loginCheck.loginInfo);

  const nav = useNavigate();
  const linkMethod = (path) => {
    nav(path);
  }

  return (
    <div style={{bottom : props.bottom}} className={classes.menuBarWrap}>
        <ul className={classes.menuArea}>
          <li onClick={() => {linkMethod('/main')}} >
            <img src={home} />
            <p>홈</p>
          </li>
          <li onClick={() => {linkMethod('/myClass')}}>
            <img src={mypage} />
            <p>내모임</p>
          </li>
          <li onClick={() => {linkMethod('/myPage')}}>
            <div className={classes.myImg}>
              <img className={classes.img3} src={userInfo.profileImgPath} />
            </div>
            <p>내정보</p>
          </li>
        </ul>
    </div>
  );
};

export default FixedMenuBar;