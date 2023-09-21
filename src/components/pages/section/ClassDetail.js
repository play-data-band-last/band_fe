import React, {useEffect, useRef, useState} from 'react';
import classes from "../../../styles/pages/Main.module.css";
import myClasses from "../../../styles/pages/ClassDetail.module.css";
import {Mobile, PC} from "../../config/Responsive";
import back from "../../../asset/images/back.png";
import heart from "../../../asset/images/heartborder.png";
import heartFillImg from "../../../asset/images/heartfill.png";
import share from "../../../asset/images/share.png";
import more from "../../../asset/images/morepng.png";
import DetailCarousel from "../../blocks/DetailCarousel";
import {useNavigate} from "react-router-dom";
import ClassDetailMain from "../Layout/ClassDetailMain";
import ClassDetailBoard from "../Layout/ClassDetailBoard";
import ClassDetailAlbum from "../Layout/ClassDetailAlbum";
import ClassDetailChat from "../Layout/ClassDetailChat";
import {
  findByCommunityAlbum,
  findByCommunityBoard,
  findByCommunityById, findByCommunityComments,
  findByCommunityCount,
  findByCommunitySchedule,
  findByMyReserve,
  scheduleMemberCondition
} from "../../../common/api/ApiGetService";
import {useDispatch, useSelector} from "react-redux";
import PopupDom from "../../blocks/PopupDom";
import MsgPopup from "../../blocks/MsgPopup";
import ConfirmPopup from "../../blocks/ConfirmPopup";
import {
  communityInsert,
  communityMemberDelete,
  likeAddFunc,
  likeRemoveFunc,
  scheduleInsert
} from "../../../common/api/ApiPostService";
import Loading from "../../atoms/Loading";
import {loginCheckAction} from "../../../ducks/loginCheck";

const ClassDetail = () => {
  const border = useRef();
  const [activeSlide, setActiveSlide] = useState(0); // 현재 활성화된 슬라이드 인덱스 상태
  const [heartFill, setHeartFill] = useState(false);
  const [communityInfo, setCommunityInfo] = useState({});
  const [communityCount, setCommunityCount] = useState('');
  const [communitiyId, setCommunitiyId] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);
  const [isMsgPopupOpen, setIsMsgPopupOpen] = useState({show : false, msg: ''});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState({show : false, msg: '', gb : '', data : ''});
  const userInfo = useSelector(state => state.loginCheck.loginInfo);
  const [isCommunityMember, setIsCommunityMember] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState([]);
  const [communityBoards, setCommunityBoards] = useState([]);
  const [communityAlbums, setCommunityAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const detailValue = urlParams.get('detail');

    setCommunitiyId(urlParams.get('detail'));


    borderAction(urlParams.get('pageIdx'));


    // 커뮤니티 상세정보 GET..
    findByCommunityById(detailValue).then((res) => {
      if (res.status === 200) {

        const data = res.data;


        findByMyReserve(userInfo.userSeq).then((res) => {
          if (res.status === 200) {
            res.data.forEach((item, idx) => {
              if (item.communityId == urlParams.get('detail')) {
                data.reserve = true;
                setHeartFill(true);

              }
            })
          }
        }).catch((err) => {
          console.log(err);
        })

        setCommunityInfo(data);

      }
    }).catch((err) => {
      console.log(err);
    });

    findByCommunityCountHandler(detailValue);
    findByCommunityScheduleHandler(detailValue);

  }, []);

  const findByCommunityCountHandler = (defaultId) => {
    let commentArr = [];
    // 특정 커뮤니티의 가입 리스트..
    findByCommunityCount(defaultId).then((res) => {

      if(res.status === 200) {

        if (res.data.length === 0) {
          setIsCommunityMember(false);
        }

        res.data.forEach((item, idx) => {
          if (item.memberId == userInfo.userSeq) {
            setIsCommunityMember(true);
          }
        })

        setCommunityCount(res.data);
      }

    }).catch((err) => {
      console.log(err);
    })
  }

  const findByCommunityScheduleHandler = (defaultId) => {
    findByCommunitySchedule(defaultId).then((res) => {

      const data = res.data;

      data.forEach((item, idx) => {

        scheduleMemberCondition(item.id, userInfo.userSeq).then((res) => {
           if(res.data) {
             data[idx].useYn = true;
           } else {
             data[idx].useYn = false;
           }
        }).catch((err) => {

        })
      })

      setScheduleInfo(data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const findByCommunityBoardService = async (communityId) => {
      const data = await findByCommunityBoard(communityId);


      if (data.status === 200) {
        const assignObj = data.data.content;

        for (const [idx, item] of data.data.content.entries()) {
          const data2 = await findByCommunityComments(item.id);

          if (data2.status === 200) {

            assignObj[idx].comments = data2.data;
          }
        }

        // for(const item of data.data.content) {
        //   const data2 = await findByCommunityComments(item.id);
        //
        //   if (data2.status === 200) {
        //     arr.push(data2.data);
        //   }
        // }

        setCommunityBoards(assignObj);
      }

      // findByCommunityBoard(communityId).then((res) => {
      //     if(res.status === 200) {
      //       setCommunityBoards(res.data.content);
      //     }
      //
      // }).catch((err) => {
      //
      // });

  }

  const findByCommunityAlbumService = (communitiyId) => {
    findByCommunityAlbum(communitiyId).then((res) => {
      if(res.status === 200) {
        setCommunityAlbums(res.data.content);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const borderAction = (idx) => {


    switch (idx) {
      case 0 :
        border.current.style.left = '0%';
        setActiveSlide(idx);
      break;

      case 1 :
        findByCommunityBoardService(communitiyId);
      break;

      case 2 :
        findByCommunityAlbumService(communitiyId);
      break;


    }


    border.current.style.left = `${idx * 25}%`;


    // 높이를 공유하기 때문에 다른 el 의 높이를 죽여주자..


    // 슬라이드 인덱스를 업데이트
    setActiveSlide(idx);

  }

  const sections = [
    {
      el : <ClassDetailMain setIsMsgPopupOpen={setIsMsgPopupOpen} scheduleInfo={scheduleInfo} setIsConfirmPopupOpen={setIsConfirmPopupOpen} isCommunityMember={isCommunityMember} communitiyId={communitiyId} communityInfo={communityInfo} communityCount={communityCount} />,
      //height: 'auto'
    },
    {
      el : <ClassDetailBoard findByCommunityBoardService={findByCommunityBoardService} communitiyId={communitiyId} communityBoards={communityBoards} />,
      //height: '100%'
    },
    {
      el : <ClassDetailAlbum findByCommunityAlbumService={findByCommunityAlbumService} communityAlbums={communityAlbums} communitiyId={communitiyId} />,
      //height: '100%'
    },
    {
      el : <ClassDetailChat communitiyId={communitiyId} />,
      //height: '100%'
    }
  ];

  const likeHandler = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      likeAddFunc(userInfo.userSeq, communityInfo.id, communityInfo.description, communityInfo.profileImage).then((res) => {
        if (res.status === 200) {
          setIsMsgPopupOpen({show: true, msg: '내 찜 리스트에 추가 되었습니다.'});
          setHeartFill(true);
        }
      }).catch((err) => {

      })

    }, 500);
  }

  const likeCancelHandler = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      likeRemoveFunc(userInfo.userSeq, communitiyId).then((res) => {
        if (res.status === 200) {
          setIsMsgPopupOpen({show: true, msg: '내 찜 리스트 에서 삭제 되었습니다.'});
          setHeartFill(false);
        }
      }).catch((err) => {

      })

    }, 500);
  }

  const backHandler = () => {
    nav('/main');
  }

  const closeMsgPopup = () => {
    setIsMsgPopupOpen({show: false, msg: ''});
  }

  const closeConfirmPopup = () => {

    setIsConfirmPopupOpen({show: false, msg: '', gb : '', data : ''});
  }

  const logoutHandler = () => {
    setIsConfirmPopupOpen({show: true, msg: '로그아웃 하시겠습니까 ?', gb : 'logout', data : ''});
  }

  const confirmHandler = () => {
    setLoading(true);

    if (isConfirmPopupOpen.gb === 'community') {

      setTimeout(() => {
        communityInsert(communitiyId, userInfo.userSeq, userInfo.username, "일반회원", userInfo.profileImgPath, communityInfo.description, communityInfo.profileImage).then((res) => {
          setLoading(false);

          findByCommunityCountHandler(communitiyId);

          setIsConfirmPopupOpen({ show: false, msg: '', gb : '' , data : ''});
        }).catch((err) => {
          console.log(err);
          setLoading(false);
        })

      }, 500);

      return ;
    }

    if (isConfirmPopupOpen.gb === 'communityCancel') {
      setTimeout(() => {

        communityMemberDelete(userInfo.userSeq, communitiyId).then((res) => {
          setLoading(false);
          findByCommunityCountHandler(communitiyId);

          setIsConfirmPopupOpen({ show: false, msg: '', gb : '', data : '' });
        }).catch((err) => {
          console.log(err);
        })

      }, 500);
    }

    if (isConfirmPopupOpen.gb === 'scheduleInsert') {
      setTimeout(() => {

        scheduleInsert(userInfo.userSeq, isConfirmPopupOpen.data, 'Y', communitiyId).then((res) => {

          if (res.data.status === "success") {
            setLoading(false);
            setIsConfirmPopupOpen({ show: false, msg: '', gb : '', data : '' });
            setIsMsgPopupOpen({show: true, msg: res.data.data});

            findByCommunityScheduleHandler(communitiyId);
          }
        }).catch((err) => {
          setLoading(false);
          setIsConfirmPopupOpen({ show: false, msg: '', gb : '', data : '' });
          setIsMsgPopupOpen({show: true, msg: err.response.data.data.message});
          console.log(err);
        })

      }, 500);
    }

    if (isConfirmPopupOpen.gb === 'logout') {

      setTimeout(() => {
        setLoading(false);
        const res = {
          isLogin : false,
          id : null,
          username : null,
          profileImgPath : null,
          mbti : null,
          token : null,
          userSeq : null,
          interest : []
        }
        dispatch(loginCheckAction.loginInfoSet(res));
        nav('/')
      }, 500);

    }
  }
  return (
    <div>
      <PC>
        <div className={classes.pcWrap} >
          <p className={classes.pcWrapInner}>화면을 550px 이하로 줄여 주세요.</p>
        </div>
      </PC>
      <Mobile>
      <div className={myClasses.classDetailWrap}>
        <div className={myClasses.detailHeader}>
          <div className={myClasses.detailHeaderWrap}>
            <div className={myClasses.back} onClick={backHandler}>
              <img src={back} />
            </div>
            <h2>{communityInfo.description}</h2>
            <div className={myClasses.iconWrap}>
              <div className={myClasses.heart}>
                {heartFill && <img onClick={likeCancelHandler} src={heartFillImg} />}
                {!heartFill && <img onClick={likeHandler} src={heart} />}
              </div>
              <div className={myClasses.share}>
                <img src={share} />
              </div>
              <div onClick={logoutHandler} className={myClasses.more}>
                <img src={more} />
              </div>
            </div>
          </div>
        </div>

        <div className={myClasses.selectArea}>
          <div className={myClasses.selectAreaInner}>
            {["홈", "게시판", "사진첩", "채팅"].map((item,idx) => (
              <div key={idx} onClick={() => {borderAction(idx)}} className={myClasses.selectItem}>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className={myClasses.border}>
            <div ref={border} className={myClasses.borderInner}></div>
          </div>
        </div>

        <DetailCarousel activeSlide={activeSlide} onSlideChange={borderAction} section={sections} />

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

export default ClassDetail;