import React, {useEffect, useState} from 'react';
import classes from "../../../styles/pages/Main.module.css";
import myClasses from "../../../styles/pages/MyClass.module.css";
import {Mobile, PC} from "../../config/Responsive";
import Header from "../Layout/Header";
import FixedMenuBar from "../Layout/FixedMenuBar";
import UserClass from "../../blocks/UserClass";
import {categoryMenu} from "../../../common/Menus";
import Category from "../../blocks/Category";
import SuggestComunity from "../../blocks/SuggestComunity";
import ClassCarousel from "../../blocks/ClassCarousel";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Loading from "../../atoms/Loading";
import {findByMyCommunity, interestCommunityGet} from "../../../common/api/ApiGetService";
import {userRecommandCommunity} from "../../../common/api/ApiPostService";

const MyClass = () => {
  const [showFixedMenuBar, setShowFixedMenuBar] = useState(false);
  const [isCategoryMore, setIsCategoryMore] = useState(true);
  const [categoryCount, setCategoryCount] = useState(10);
  const [categoryMenuLength, setCategoryMenuLength] = useState(categoryMenu.length);
  const [categoryMoreText, setCategoryMoreText] = useState(true);
  const [findCategoryText, setFindCategoryText] = useState('운동/스포츠');
  const [loading, setLoading] = useState(false);
  const [communityList, setCommunityList] = useState([])
  const [recommandList, setRecommandList] = useState([])
  const [myCommunity, setMyCommunity] = useState([])
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [mainFirstReq, setMainFirstReq] = useState(false);
  const userInfo = useSelector(state => state.loginCheck.loginInfo);
  const nav = useNavigate();

  useEffect(() => {

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

    // 내 추천 리스트..
    userRecommandCommunity(array, page, size).then((res) => {
      if (res.status === 200) {
          setRecommandList(res.data.content);
      }
    }).catch((err) => {

    })

    // 단일 흥미 리스트..
    interestCommunityGet(findCategoryText, page, size).then((res) => {
      if(res.status === 200) {

        setLoading(false);
        setCommunityList(res.data.content);
      }
    }).catch((err) => {

    })

    findByMyCommunity(userInfo.userSeq).then((res) => {
      if (res.status === 200) {
        setMyCommunity(res.data);
        const communityIds = res.data.map((item) => item.communityId);;
      }
    }).catch((err) => {

    })

    const handleScroll = () => {
      // 여기에 스크롤 이벤트 핸들링 로직을 추가
      if (window.scrollY > 0) {
        // 스크롤이 내려갈 때
        setShowFixedMenuBar(true);
      } else {
        // 스크롤을 가장 위로 올릴 때
        setShowFixedMenuBar(false);
      }


      // 스크롤 위치 계산
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;


      if (scrollTop + windowHeight + 1 >= documentHeight) {


        // 선택후 인피니티..
        if (mainFirstReq) {
          setLoading(true);

          setTimeout(() => {
            interestCommunityGet(findCategoryText, page, 5).then((res) => {
              setLoading(false);

              if(res.status === 200) {
                const newData = res.data.content;

                setCommunityList(prevData => [...prevData, ...newData]);
              }

            }).catch((err) => {

            })
          }, 500);

          return ;
        }

      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [findCategoryText]);

  const categoryMoreShow = () => {
    setIsCategoryMore(!isCategoryMore);
    setCategoryMoreText(false);
  }

  const findClassHandler = (data) => {
    setLoading(true);
    setMainFirstReq(true);


    setTimeout(() => {
      setLoading(false);

      interestCommunityGet(data).then((res) => {

        if(res.status === 200) {

          setLoading(false);
          setCommunityList(res.data.content);
        }


      }).catch((err) => {

      })

      setFindCategoryText(data);
    }, 500);

  }

  const goToDetail = (data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      nav(`/classDetail?detail=${data}`);
    }, 400);

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

          <div className={myClasses.classWrap}>
            <div><h2 className={myClasses.titleText}>내 취미를 같이 즐겨봐요.</h2></div>
          </div>

          <div className={myClasses.slideWrap}>
            <ClassCarousel data={recommandList} />
          </div>

          <div className={myClasses.classWrap}>
            <div><h2 className={myClasses.titleText}>가입한 모임</h2></div>
          </div>

          <div className={myClasses.userClassWrap}>
            {myCommunity.length != 0 ? myCommunity.map((item, idx) => (
              <UserClass memberCount={myCommunity.length} key={idx} data={item} />
            )) : <p style={{textAlign : 'center', padding : '2vw'}}>가입한 모임이 없습니다.</p>}

          </div>

          <div style={{marginBottom : '0'}} className={myClasses.classWrap}>
            <div><h2 className={myClasses.titleText}>모임 찾기</h2></div>
          </div>

          <div className={classes.categoryArea}>
            {(isCategoryMore ? categoryMenu.slice(0, categoryCount) : categoryMenu.slice(0, categoryMenuLength)).map((item, idx) => (
              <div key={idx} onClick={() => {findClassHandler(item.menuName)}}  className={classes.categoryAreaWrap}>
                <Category mb='2vw' textWidth='auto' color='#333' width='13vw' height='13vw' imgPath={item.imgPath} value={item.menuName} />
              </div>
            ))}
          </div>

          <div className={classes.categoryMoreArea}>
            <p onClick={categoryMoreShow} className={classes.categoryMoreAreaParam}>{categoryMoreText ? '카테고리 더보기' : '카테고리 접기'}</p>
          </div>

          <div className={myClasses.classWrap}>
            <div><h2 className={myClasses.titleText}><span>{findCategoryText}</span> 맞춤추천</h2></div>
          </div>

          <div className={myClasses.suggestionPadding}>
            {communityList.map((item, idx) => (
              <SuggestComunity key={idx} data={item} key={idx} onClick={() => goToDetail(item.id)} />
            ))}
          </div>

          {/* bottom={showFixedMenuBar ? '0' : '-20vw'} */}
          <FixedMenuBar />
        </div>
        {loading && <Loading />}
      </Mobile>
    </>
  );
};

export default MyClass;