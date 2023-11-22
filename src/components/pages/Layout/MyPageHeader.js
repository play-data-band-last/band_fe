import set from "../../../asset/images/setting.webp";
import classes from "../../../styles/pages/Header.module.css";
const MyPageHeader = () => {
  return (
    <header>
      <div className={classes.headerWrap}>
        <div className={classes.headerLeft}>
          <p className={classes.headerLeftText}>내정보</p>
        </div>
        <div className={classes.headerRight}>
          <img className={classes.notiImg} src={set} />
        </div>
      </div>
    </header>
  )
}

export default MyPageHeader;