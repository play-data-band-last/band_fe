import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import router from './Router';
import {Provider} from "react-redux";
import store from './ducks';
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {
    RecoilRoot,
} from 'recoil';

export let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
    </RecoilRoot>
);

reportWebVitals();
