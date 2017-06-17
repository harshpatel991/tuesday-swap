import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NavComponent from './NavComponent';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<NavComponent />, document.querySelector('navbar'));
