// App.js
import React, { useRef } from 'react';
import './App.css';

import ChatWindow from './components/ChatWindow';
import LayoutEffectDemo from './components/LayoutEffectDemo';
import LayoutExample from './components/LayoutExample';
import { FlickerDemo } from './components/FlickerDemo';
const App = () => {

  return (
    <div>
      {/* <ChatWindow /> */}
      {/* <LayoutEffectDemo/> */}
      {/* <LayoutExample/> */}
      {/* useLayoutEffect MORE EVIDENT */}
      <FlickerDemo useLayout={false} /> {/* Red to green flicker */}
      <FlickerDemo useLayout={true} />  {/* No flicker */}

    </div>
  );
};

export default App;
