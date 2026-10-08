import React from 'react';
import './App.css';
import InputWithEvent from './components/InputWithEvent';
import InputWithRef from './components/InputWithRef';
import InputWithRefOnly from './components/InputWithRefOnly';
import NoRerenderComponent from './components/NoRerenderComponent';

function App() {
  return (
    <>
      <InputWithEvent />
      <InputWithRef />
      <InputWithRefOnly />
      <NoRerenderComponent />
    </>
  );
}

export default App;
