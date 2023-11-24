import classes from "../../../styles/pages/Main.module.css";
import mainLogo from "../../../asset/images/mainlogo2.webp";
import {useNavigate} from "react-router-dom";
import {Mobile, PC} from "../../config/Responsive";
import Category from "../../blocks/Category";
import Button from "../../atoms/Button";
import {categoryMenu} from "../../../common/Menus";
import {useState} from "react";
import Loading from "../../atoms/Loading";
import {userInterestSave} from "../../../common/api/ApiPostService";
import {useSelector} from "react-redux";

const UserCategoryType = () => {
  const nav = useNavigate();
  const [selectedIndexes, setSelectedIndexes] = useState([]); // 선택한 항목의 인덱스 배열
  const [loading, setLoading] = useState(false);
  const isLogin = useSelector(state => state.loginCheck.loginInfo);

  const toggleItem = (index) => {
    // 선택한 항목의 인덱스를 토글
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((item) => item !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const coverClickHandler = (index) => {
    // 선택한 항목의 인덱스를 토글
    toggleItem(index);
  };

  const isItemSelected = (index) => {
    // 선택한 항목인지 확인
    return selectedIndexes.includes(index);
  };



  const loginMethods = () => {
    nav('/');
  }

  const categorySave = async () => {
    const selectedItems = categoryMenu.filter((_, idx) => isItemSelected(idx)).map((item) => item.menuName);

    setLoading(true);

    try {
      // 비동기 호출들을 모아둘 배열
      const savePromises = selectedItems.map(item => userInterestSave(item, isLogin.userSeq));

      // 모든 비동기 호출이 완료될 때까지 기다림
      await Promise.all(savePromises);

      // 모든 비동기 호출이 완료되면 이 부분으로 이동
      nav('/main');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{height : '100vh'}}>
      <PC>
        <div className={classes.pcWrap} >
          <p className={classes.pcWrapInner}>화면을 550px 이하로 줄여 주세요.</p>
        </div>
      </PC>
      <Mobile>
        <div className={classes.signUpPageWrap}>
          <img className={classes.signUpPageLogo} src={mainLogo} />
        </div>
        <h2 className={classes.categorySelect}>관심사를 선택해 주세요.</h2>
        <div className={classes.categoryWrap}>
          <div className={classes.categoryWrapInnerWrap}>
            {categoryMenu.map((item, idx) => (
              <div key={idx} onClick={() => coverClickHandler(idx)} className={classes.itemWrap}>
                <div style={{ display: isItemSelected(idx) ? 'none' : 'block' }} className={classes.cover}></div>
                <Category textWidth='16vw' width='16vw' height='16vw' imgPath={item.imgPath} value={item.menuName} color={isItemSelected(idx) ? '#333' : 'rgb(230, 225, 225)'} />
              </div>
            ))}
          </div>
          <Button onClick={categorySave} value="저장" />
        </div>
        {loading && <Loading />}
      </Mobile>
    </div>
  );
}

export default UserCategoryType;