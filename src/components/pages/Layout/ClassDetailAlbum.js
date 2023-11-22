import React, {useState} from 'react';
import myClasses from "../../../styles/pages/ClassDetail.module.css";
import classes from "../../../styles/pages/ClassDetailAlbum.module.css";
import like from "../../../asset/images/like.webp";
import addBtn from "../../../asset/images/add.webp";
import Loading from "../../atoms/Loading";
import {useNavigate} from "react-router-dom";
import {likeInsertFunc} from "../../../common/api/ApiPostService";
import {useSelector} from "react-redux";

const ClassDetailAlbum = (props) => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const userInfo = useSelector(state => state.loginCheck.loginInfo);


  const createAlbumHandler = () => {
    setLoading(true);

    setTimeout(() => {
      nav(`/createAlbum?communityId=${props.communitiyId}`);
    }, 500);
  }

  const likeHandler = (data) => {
    likeInsertFunc('album', data.id, userInfo.userSeq).then((res) => {
      props.findByCommunityAlbumService(props.communitiyId);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className={myClasses.mainSwiperSection}>
      <div className={classes.albumWrap}>
        <div className={classes.albumWrapInner}>
          {props.communityAlbums.length != 0  ? props.communityAlbums.map((item, idx) => (
            <div key={idx} className={classes.albumItem}>
              <img src={item.imgPath} />
              <div onClick={() => {likeHandler(item)}} className={classes.likeArea}>
                <img src={like} /><p>{item.likeCount}</p>
              </div>
            </div>
          )) : <p style={{margin: '0 auto', height: '100%', background : '#fff', paddingTop: '10vw'}}>등록된 사진이 없습니다.</p>}
        </div>
      </div>
      <div onClick={createAlbumHandler} className={classes.createCommunity}>
        <img src={addBtn} />
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default ClassDetailAlbum;