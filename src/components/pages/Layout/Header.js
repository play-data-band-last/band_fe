import noti from "../../../asset/images/noti.png";
import search from "../../../asset/images/search.png";
import classes from "../../../styles/pages/Header.module.css";
import {useNavigate} from "react-router-dom";
const Header = () => {
  const nav = useNavigate();

  const goToSearchPage = () => {
    nav('/search');
  }

  return (
    <header>
      <div className={classes.headerWrap}>
        <div className={classes.headerLeft}>
          <p className={classes.headerLeftText}>독산동</p>
        </div>
        <div className={classes.headerRight}>
          <img onClick={goToSearchPage} className={classes.notiImg} src={search} />
          <img className={classes.notiImg} src={noti} />
        </div>
      </div>
    </header>
  )
}

export default Header;