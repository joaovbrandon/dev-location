import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import { toast } from 'react-toastify';
import store from './store';
import Routes from './routes';
import { GlobalStyle } from './styles';

dotenv.config();
toast.configure({ autoClose: 3000 });

const App = () => (
  <Provider store={store}>
    <Fragment>
      <GlobalStyle />
      <Routes />
    </Fragment>
  </Provider>
);

export default App;
