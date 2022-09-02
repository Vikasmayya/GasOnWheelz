import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import App from './App';
import './index.css';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
    <Suspense fallback={<div style={{display: 'flex',alignItems: 'center',  justifyContent: 'center', height: "100vh", width: "100vw" }}>
    <CircularProgress style={{display: 'flex',alignItems: 'center',  justifyContent: 'center'}} color="primary" size={50} thickness={5}/>
    </div>}>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </Suspense>
    ,document.getElementById('root'));
 
serviceWorkerRegistration.register();