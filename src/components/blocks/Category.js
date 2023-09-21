import classes from "../../styles/blocks/Category.module.css";

const Category = (props) => {
  return (
    <div style={{marginBottom : props.mb}} className={classes.categoryWrap}>
      <div style={{width : props.width, height : props.height}} className={classes.imgWrap}>
        <img  className={classes.img} src={props.imgPath} />
      </div>
      <div style={{width : props.textWidth}}>
        <p style={{color : props.color}} className={classes.itemParam}>{props.value}</p>
      </div>
    </div>
  )
}

export default Category;