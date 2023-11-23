import Header from "../Layout/Header";
import {Mobile, PC} from "../../config/Responsive";
import classes from "../../../styles/pages/Main.module.css";
import {useEffect, useRef, useState} from "react";
import banner from "../../../asset/images/banner.webp";
import Category from "../../blocks/Category";
import {categoryMenu} from "../../../common/Menus";
import SuggestComunity from "../../blocks/SuggestComunity";
import FixedMenuBar from "../Layout/FixedMenuBar";
import {useNavigate} from "react-router-dom";
import Loading from "../../atoms/Loading";
import {findByCommunityMember, interestCommunityGet, interestNewCommunityGet} from "../../../common/api/ApiGetService";
import {useSelector} from "react-redux";
import {interestCommunityScheduleGet, userRecommandCommunity} from "../../../common/api/ApiPostService";
import SuggestSchedule from "../../blocks/SuggestSchedule";
import addBtn from "../../../asset/images/add.webp";
import {saveToLocalStorage} from "../../../common/CommonFunc";

const Main = () => {
  const border = useRef();
  const [categoryMoreText, setCategoryMoreText] = useState(true);
  const [isCategoryMore, setIsCategoryMore] = useState(true);
  const [categoryMenuLength, setCategoryMenuLength] = useState(categoryMenu.length);
  const [categoryCount, setCategoryCount] = useState(10);
  const [showFixedMenuBar, setShowFixedMenuBar] = useState(false);
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(state => state.loginCheck.loginInfo);
  const [communityList, setCommunityList] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [categorySelect, setCategorySelect] = useState(false);
  const [newCategorySelect, setNewCategorySelect] = useState(false);
  const [selectMenuName, setSelectMenuName] = useState('');
  const [mainFirstReq, setMainFirstReq] = useState(true);
  const [scheduleArea, setScheduleArea] = useState(false);
  const [scheduleArray, setScheduleArray] = useState([]);
  const [displayCreateCommunity, setDisplayCreateCommunity] = useState(false);
  let mainNum = 0;
  let scheduleNum = 0;
  let newCommunityNum = 0;
  let categoryNum = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    // 로그인 아니면 튕굼..
    if (!userInfo.isLogin) {
      nav('/');
      return;
    }

    // 빈 arr 만들어서..
    const array = [];

    // arr에 저장..
    userInfo.interest.forEach((item, idx) => {
      array.push(item.interest);
    })


    // userRecommandCommunity(array, page, size).then((res) => {
    //
    //   if (res.status === 200) {
    //     if (mainFirstReq) {
    //
    //       const arr = res.data.content;
    //
    //       for (const [idx, item] of res.data.content.entries()) {
    //         findByCommunityMember(item.id)
    //           .then((res) => {
    //
    //             if (res.data.length == 0) {
    //               arr[idx].memberCount = 0;
    //             } else {
    //               arr[idx].memberCount = res.data.length;
    //             }
    //
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //           });
    //       }
    //       setCommunityList(arr);
    //       setMainFirstReq(false);
    //     }
    //
    //   }
    //
    // }).catch((err) => {
    //
    // })


    window.addEventListener('scroll', handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  // categorySelect, selectMenuName, scheduleArea
  }, []);

  const handleScroll = () => {

    // 스크롤 위치 계산
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 스크롤을 내릴 때 요소 나타내기
    if (scrollTop > 100) {
      setDisplayCreateCommunity(true);
    } else {
      // 스크롤을 가장 위로 올릴 때 요소 숨기기
      setDisplayCreateCommunity(false);
    }

    // 스크롤이 페이지 하단에 도달
    if (scrollTop + windowHeight + 1 >= documentHeight) {


      // 일정 인피니티 스크롤
      if (scheduleArea) {
        setLoading(true);
        // 빈 arr 만들어서..
        const array = [];

        // arr에 저장..
        userInfo.interest.forEach((item, idx) => {
          array.push(item.interest);
        })

        setTimeout(() => {
          setLoading(false);
          interestCommunityScheduleGet(array, scheduleNum, 5).then((res) => {
            if(res.status === 200) {
              const newData = res.data;
              setScheduleArray(prevData => [...prevData, ...newData]);
              scheduleNum++;
            }
          }).catch((err) => {
            console.log(err);
          })

        }, 500);

        return ;
      }

      // 카테고리 인피니티 스크롤..
      if (categorySelect) {
        setLoading(true);

        setTimeout(() => {
          interestCommunityGet(selectMenuName, categoryNum, 5).then((res) => {
            setLoading(false);

            if(res.status === 200) {
              const newData = res.data.content;
              setCommunityList(prevData => [...prevData, ...newData]);
              categoryNum++;
            }

          }).catch((err) => {

          })
        }, 500);

        return ;
      }

      // 신규모임 인피니티 스크롤
      if(newCategorySelect) {
        setLoading(true);

        setTimeout(() => {

          interestNewCommunityGet(selectMenuName, newCommunityNum, size).then((res) => {
            setLoading(false);

            if(res.status === 200) {
              const newData = res.data.content;
              setCommunityList(prevData => [...prevData, ...newData]);
              newCommunityNum++;
            }

          }).catch((err) => {

          })
        }, 500);

        return ;
      }

      // 일반 main 에서 인피니티 스크롤..
      const array = [];
      userInfo.interest.forEach((item, idx) => {
        array.push(item.interest);
      })

      userRecommandCommunity(array, mainNum, 5).then((res) => {
        setLoading(true);

        setTimeout(() => {
          setLoading(false);

          if (res.status === 200) {
            const newData = res.data.content;
            setCommunityList(prevData => [...prevData, ...newData]);
            mainNum++;
          }

        }, 500);

      }).catch((err) => {

      })
    }
  };

  const borderAction = (idx) => {

    if (idx === 0) {
      setScheduleArea(false);
      border.current.style.left = '0%';

      setLoading(true);
      // 빈 arr 만들어서..
      const array = [];

      // arr에 저장..
      userInfo.interest.forEach((item, idx) => {
        array.push(item.interest);
      })

      setTimeout(() => {
        userRecommandCommunity(array, 0, 10).then((res) => {
          setLoading(false);
          if (res.status === 200) {
            setCommunityList(res.data.content);
            setMainFirstReq(false);
          }

        }).catch((err) => {

        })

      }, 400);


      return ;
    }

    border.current.style.left = `${idx * 33.3}%`;

    if(idx === 1) {
      setLoading(true);

      // 빈 arr 만들어서..
      const array = [];

      // arr에 저장..
      userInfo.interest.forEach((item, idx) => {
        array.push(item.interest);
      })

      setTimeout(() => {
        setLoading(false);
        setScheduleArea(true);

        interestCommunityScheduleGet(array).then((res) => {
          setScheduleArray(res.data);
        }).catch((err) => {
          console.log(err);
        })

      }, 500)

    }

    if (idx === 2) {
      setScheduleArea(false);
      setNewCategorySelect(true);
      setLoading(true);

      interestNewCommunityGet(0, 10).then((res) => {

        setTimeout(() => {
          setLoading(false);

          const arr = res.data.content;

          for (const [idx, item] of res.data.content.entries()) {
            findByCommunityMember(item.id)
              .then((res) => {

                if (res.data.length == 0) {
                  arr[idx].memberCount = 0;
                } else {
                  arr[idx].memberCount = res.data.length;
                }

              })
              .catch((err) => {
                console.log(err);
              });
          }

          setCommunityList(arr);
        }, 500);

      }).catch((err) => {

      })

    }


  }

  const categoryMoreShow = () => {
    setIsCategoryMore(!isCategoryMore);
    setCategoryMoreText(false);
  }

  const goToDetail = (data) => {
    setLoading(true);
    debugger
    const storageData = {
      communityName : data.description,
      communityImgPath : data.profileImage,
      communityId : data.id
    }

    // localstorage 저장..
    saveToLocalStorage(storageData);

    setTimeout(() => {
      setLoading(false);

      nav(`/classDetail?detail=${data.id}&ownerId=${data.ownerId}`);
    }, 400);

  }

  const categoryClickMethod = (menuName) => {
    setLoading(true);
    setCategorySelect(true);
    setSelectMenuName(menuName);

    setTimeout(() => {
      interestCommunityGet(menuName).then((res) => {

        if(res.status === 200) {

          setLoading(false);
          setCommunityList(res.data.content);
        }


      }).catch((err) => {

      })

    }, 500);
  }

  const mainCategoryGet = () => {
    const array = [];

    // arr에 저장..
    userInfo.interest.forEach((item, idx) => {
      array.push(item.interest);
    })

    userRecommandCommunity(array, page, size).then((res) => {

      if (res.status === 200) {
        if (mainFirstReq) {
          setCommunityList(res.data.content);
          setMainFirstReq(false);
        }

      }

    }).catch((err) => {

    })
  }

  const createCommunityHadler = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      nav('/createCommunity')

    }, 500);
  }

  const scheduleLink = (data) => {
    setLoading(true);

    setTimeout(() => {
      nav(`/classDetail?detail=${data}`);
    }, 500);
  }

   return (
    <>
      <PC>
        <div className={classes.pcWrap} >
          <p className={classes.pcWrapInner}>화면을 550px 이하로 줄여 주세요.</p>
        </div>
      </PC>
      <Mobile>
        <div className={classes.fixedSpace}>
          <Header />
          <div className={classes.selectArea}>
            <div className={classes.selectAreaInner}>
              {["추천모임", "소모임 일정", "신규모임"].map((item,idx) => (
                <div key={idx} onClick={() => {borderAction(idx)}} className={classes.selectItem}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className={classes.border}>
              <div ref={border} className={classes.borderInner}></div>
            </div>
          </div>
          <div className={classes.bannerWrap}>
            <img className={classes.bannerImg} src={banner} />
          </div>
          <div className={classes.categoryArea}>
            {(isCategoryMore ? categoryMenu.slice(0, categoryCount) : categoryMenu.slice(0, categoryMenuLength)).map((item, idx) => (
              <div key={idx} onClick={() => {categoryClickMethod(item.menuName)}}  className={classes.categoryAreaWrap}>
                <Category mb='2vw' textWidth='auto' color='#333' width='13vw' height='13vw' imgPath={item.imgPath} value={item.menuName} />
              </div>
            ))}
          </div>

          <div className={classes.categoryMoreArea}>
            <p onClick={categoryMoreShow} className={classes.categoryMoreAreaParam}>{categoryMoreText ? '카테고리 더보기' : '카테고리 접기'}</p>
          </div>

          {!scheduleArea && <div className={classes.suggestionWrap}>
            {communityList.map((item, idx) => (
              <SuggestComunity data={item} key={idx} onClick={() => goToDetail(item)} />
            ))}
          </div>}
          {scheduleArea && <div className={classes.suggestionWrap}>
            {scheduleArray.map((item, idx) => (
              <SuggestSchedule onClick={() => {scheduleLink(item.communityId)}} data={item} key={idx} />
            ))}
          </div>}

          <div onClick={createCommunityHadler} style={{opacity : displayCreateCommunity ? 100 : 0}} className={classes.createCommunity}>
            <img src={addBtn} />
          </div>
          <FixedMenuBar />
          {loading && <Loading />}
        </div>
      </Mobile>
    </>

  )
}

export default Main;