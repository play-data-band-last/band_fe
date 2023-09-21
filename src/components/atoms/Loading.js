import loading from "../../asset/images/load.gif";
import classes from "../../styles/atoms/Loading.module.css";
const Loading = () => {
  return (
    <div className={classes.loadWrap}>
      <img className={classes.img} src={loading} />
    </div>
  )
}

export default Loading;