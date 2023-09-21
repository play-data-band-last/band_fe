import React, {useEffect, useState} from 'react';
import classes from "../../styles/pages/ClassDetailBoard.module.css";
import {findByCommunityComments} from "../../common/api/ApiGetService";

const CommentComponent = (props) => {
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {

    // findByCommunityComments(props.id).then((res) => {
    //   if (res.data.length != 0) {
    //     setCommentData(res.data);
    //   }
    // }).catch((err) => {
    //
    // })

  }, []);

  return (
    <div className={classes.commentWrap}>
      <div className={classes.commentWrapInner}>
        <div className={classes.commentWrapImg}>
          <img src="https://i.namu.wiki/i/M7nB7HBQPH04NhvghkGrTFAgIqH76ZIsAzGu_v-NcdgQ5F6Yr_rXdXFJpmLEKSYqueKYnSbdmnmL69GgPcPAtA.webp" />
        </div>
        <div>
          <p>댓글</p>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;