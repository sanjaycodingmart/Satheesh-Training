import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import Axios from 'axios';

Axios.defaults.baseURL='http://localhost:5003';
Axios.defaults.headers.post['Content-Type']='application/json';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();