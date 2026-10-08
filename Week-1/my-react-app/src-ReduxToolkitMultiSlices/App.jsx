import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
//npm install @reduxjs/toolkit react-redux axios

import React from 'react';
import UserCRUD from './components/UserCRUD';
import ProductCRUD from './components/ProductCRUD';
import InventoryCRUD from './components/InventoryCRUD';
import HealthStatus from './components/HealthStatus';
import ProductInventory from "./components/ProductInventory";
//E:\MURALI\REACT-JS-TRAINING\my-react-app\backend>
//node server.js

function App() {
  return (
    <div className="container">
      <h1 className="gradient-heading">React Redux-Toolkit CRUD Dashboard</h1>
      <div className="center-screen">
        <HealthStatus />
      </div>
      <div className="crud-wrapper">
        <div className="crud-card">
          <UserCRUD />
        </div>
        <div className="crud-card">
          <ProductCRUD />
        </div>
        <div className="crud-card">
          <InventoryCRUD />
        </div>
        <div className="crud-card">
          <ProductInventory />
        </div>
      </div>
    </div>
  );
}

export default App;

