import {userLogin} from "./api/ApiPostService";
import {apiClient} from "./api/ApiClient";

export const login = async (userId, userPwd) => {

  const res = {
    isLogin : false,
    id : null,
    username : null,
    profileImgPath : null,
    mbti : null,
    token : null,
    userSeq : null,
    interest : [],
    location : null
  }

  try {
    // 로그인과 동시에 userId 와 pwd 를 이용한 Jwt Token 발행 함수..

    const response = await userLogin(userId, userPwd);

    if (response.status === 200) {

      const jwtToken = 'Bearer ' + response.data.data.token;

      res.isLogin = true;
      res.id = response.data.data.email;
      res.username = response.data.data.username;
      res.profileImgPath = response.data.data.profileImgPath;
      res.mbti = response.data.data.mbti;
      res.token = jwtToken;
      res.userSeq = response.data.data.userId;
      res.interest = response.data.data.interests;
      res.location = response.data.data.location;

      // 토큰 인증 성공시 모든 API에 기본 요청 토큰 설정..
      apiClient.interceptors.request.use((config) => {
        config.headers.Authorization = jwtToken;
        return config;
      });

      return res;
    } else {

      return res;
    }

  } catch (error) {
    return error;
  }
}

