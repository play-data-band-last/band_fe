import noti from "../../../asset/images/noti.png";
import search from "../../../asset/images/search.png";
import classes from "../../../styles/pages/Header.module.css";
import {useNavigate} from "react-router-dom";
import useCurrentLocation from "../../../common/useCurrentLocation";
import positionOptions from "../../../common/positionOptions";
import {useEffect, useState} from "react";
import WebSocketComponent from "../../../common/WebSocketComponent";
const Header = () => {
  const nav = useNavigate();
  const {testLocation, error} = useCurrentLocation(positionOptions);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (testLocation) {
      const { latitude, longitude, accuracy } = testLocation;
      setLatitude(latitude);
      setLongitude(longitude);
      setAccuracy(Math.floor(accuracy));
    }

  }, [testLocation]);


  const goToSearchPage = () => {
    nav('/search');
  }

  return (
    <header>
      <div className={classes.headerWrap}>
        <div style={{position :'relative'}} className={classes.headerLeft}>
          {accuracy != 0 && <p className={classes.headerLeftText}>{`${latitude}, ${longitude}`}</p>}
          {accuracy != 0 && <span style={{position : 'absolute', top: '6vw', left : '0', color : '#adb3b6', fontSize : '3vw'}}>{`약 ${accuracy.toLocaleString()} M 차이가 있습니다.`}</span>}
          {accuracy == 0 && <p>위치 찾는 중..</p>}
        </div>
        <div className={classes.headerRight}>
          <img onClick={goToSearchPage} className={classes.notiImg} src={search} />
          <img className={classes.notiImg} src={noti} />
        </div>
      </div>
      <WebSocketComponent />
    </header>
  )
}

export default Header;