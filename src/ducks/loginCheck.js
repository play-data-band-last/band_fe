import {createSlice} from "@reduxjs/toolkit";

const initialIsLoginState = {
  loginInfo : {
      isLogin : false,
      id : null,
      username : null,
      profileImgPath : null,
      mbti : null,
      userSeq : null,
      interest : [],
      location : null
  },

  teacherLoginInfo : {
    email : null,
    username : null
  }

}

const loginCheckSlise = createSlice({
  name : 'isLogin',
  initialState : initialIsLoginState,
  reducers : {

    loginInfoSet(state, action) {
      state.loginInfo = action.payload;
    },

    teacherLoginInfoSet(state, action) {
      state.teacherLoginInfo = action.payload;
    },

    isLogin(state, action) {
      state.loginInfo.isLogin = action.payload;
    },

    logout(state, action) {
      state.loginInfo = action.payload;
    }
  }
})

export const loginCheckAction = loginCheckSlise.actions;
export default loginCheckSlise.reducer;