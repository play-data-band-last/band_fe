import classes from "../../styles/atoms/Input.module.css";
const Input = (props) => {
  return (
    <div className={classes.inputWrap}>
      <label className={classes.label}>{props.value}</label>
      <input onChange={props.onChange} placeholder={props.placeholder} type={props.type} className={classes.input} />
    </div>
  );
}

export default Input;