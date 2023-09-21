import noti from "../../../asset/images/noti.png";
import classes from "../../../styles/pages/Header.module.css";
const Header = () => {
  return (
    <header>
      <div className={classes.headerWrap}>
        <div className={classes.headerLeft}>
          <p className={classes.headerLeftText}>독산동</p>
        </div>
        <div className={classes.headerRight}>
          <img className={classes.notiImg} src={noti} />
        </div>
      </div>
    </header>
  )
}

export default Header;