//rafce
import React from 'react';

const Header = ({ newFn }) => {
  console.log("Header Rendered!");
   return (
     <div>
       <h2>Header</h2>
       <button onClick={newFn}>Call Function</button>
     </div>
   );
};

//export default Header
export default React.memo(Header);//THIS WILL NOT ALLOW TO RE-RENDER THE COMPONENT UNNECESSARILY