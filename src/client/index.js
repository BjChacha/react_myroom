import React from 'react';
import {createRoot} from 'react-dom/client'
import Router from './router';

import 'antd/dist/antd.css';
import "./index.css";


createRoot(
  document.getElementById("root")
).render(
  <Router/>
);
