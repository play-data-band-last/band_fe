import {createBrowserRouter} from 'react-router-dom';
import App from "./App";
import Signup from "./components/pages/Login/Signup";
import UserCategoryType from "./components/pages/Login/UserCategoryType";
import Main from "./components/pages/section/Main";
import MyClass from "./components/pages/section/MyClass";
import MyPage from "./components/pages/section/MyPage";
import ClassDetail from "./components/pages/section/ClassDetail";
import TeacherSignup from "./components/pages/Login/TeacherSignup";
import TeacherMiddleWare from "./components/pages/Login/TeacherMiddleWare";
import CreateCommunity from "./components/pages/section/CreateCommunity";
import CreateSchedule from "./components/pages/section/CreateSchedule";
import CreateBoard from "./components/pages/section/CreateBoard";
import CreateAlbum from "./components/pages/section/CreateAlbum";
import ModifyInfo from "./components/pages/section/ModifyInfo";

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
  },
  {
    path : '/signUp',
    element : <Signup />,
  },
  {
    path : '/category',
    element : <UserCategoryType />,
  },
  {
    path : '/main',
    element : <Main />,
  },
  {
    path : '/myClass',
    element : <MyClass />,
  },
  {
    path : '/myPage',
    element : <MyPage />,
  },
  {
    path : '/classDetail',
    element : <ClassDetail />,
  },
  {
    path : '/auth',
    element : <TeacherMiddleWare />,
  },
  {
    path : '/authSignup',
    element : <TeacherSignup />,
  },
  {
    path : '/createCommunity',
    element : <CreateCommunity />,
  },
  {
    path : '/createSchedule',
    element : <CreateSchedule />,
  },
  {
    path : '/createBoard',
    element : <CreateBoard />,
  },
  {
    path : '/createAlbum',
    element : <CreateAlbum />,
  },
  {
    path : '/modifyInfo',
    element : <ModifyInfo />,
  },

]);

export default router;