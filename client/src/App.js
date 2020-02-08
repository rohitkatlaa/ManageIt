import React, { Component } from 'react';
import UrlRouter from './urlRouting';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import {BrowserRouter as Router} from 'react-router-dom';
import FirstPage from './containers/FirstPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
        <Router>
          <FirstPage/>
        </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
