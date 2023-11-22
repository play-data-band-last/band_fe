import {useEffect, useRef, useState} from "react";
import classes from "../../styles/blocks/CategorySelect.module.css";
import arrowBot from "../../asset/images/arrowbottom.webp";
import arrowTop from "../../asset/images/arrowtop.webp";


const CategorySelect = (props) => {
  const myMenuRef = useRef(null);
  const myMenuRef2 = useRef(null);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [btnCategoryText, setBtnCategoryText] = useState('선택');


  useEffect(() => {

    window.scrollTo(0,0);

    const handleClickOutside = (e) => {

      if (myMenuRef.current && !myMenuRef.current.contains(e.target) && !myMenuRef2.current.contains(e.target)) {
        setIsOpenDropDown(false);
      }

    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myMenuRef]);

  const btnClickDropDown = () => {
    setIsOpenDropDown(!isOpenDropDown);
  }

  const btnSelectMenu = (e) => {
    e.preventDefault();
    const liElement = e.currentTarget.querySelector("li");

    if (liElement) {
      setBtnCategoryText(liElement.innerText);
      props.setCategory(liElement.innerText);

      setIsOpenDropDown(false);
    }
  }

  return (
    <div className={classes.sbWrap}>
      <div className={classes.btnWrap} onClick={btnClickDropDown} ref={myMenuRef2}>
        <button className={classes.btnOption}>{btnCategoryText}</button>
        <div>{isOpenDropDown ?  <img className={classes.arrowSize} src={arrowTop} /> : <img className={classes.arrowSize} src={arrowBot} /> }</div>
      </div>
      {isOpenDropDown && <div ref={myMenuRef} className={classes.dropDownMenu}>
        <ul className={classes.dropDownMenu_ul}>

          {props.menuList.map((item, idx) => (
            <div key={idx} className={classes.dropDownMenuFlex} onClick={btnSelectMenu}>
              <li key={idx} className={classes.dropDownMenu_li}>{item.menuName}</li>
            </div>
          ))}

        </ul>
      </div>}

    </div>
  );
}

export default CategorySelect;