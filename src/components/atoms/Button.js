import classes from "../../styles/atoms/Button.module.css"
const Button = (props) => {
  return (
    <div className={classes.btnWrap}>
      <button style={{background : props.background, color : props.color}} onClick={props.onClick} className={classes.btn}>{props.value}</button>
    </div>
  )
}

export default Button;