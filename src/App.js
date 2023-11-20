import './styles/common/Reset.css'
import { Mobile, PC } from "./components/config/Responsive";
import classes from "./styles/pages/Main.module.css";
import Login from "./components/pages/Login/Login";
import React from 'react';



function App() {
  return (
    <div id='wrap'>
      <main>
        <PC>
          <div className={classes.pcWrap} >
            <p className={classes.pcWrapInner}>화면을 550pasdfx 이하로 줄여 주세요.</p>
          </div>
        </PC>
        <Mobile>
          <Login />
        </Mobile>
      </main>
    </div>

  );
}

export default App;
