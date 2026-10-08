//rafce
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';


const Footer = () => {
    //STEP 3 - CONSUMING THE CONTEXT DATA
    /* const phone = useContext(AppContext); */
    const {title} = useContext(AppContext);
  return (
    <>
      <div style={{width:"100%", backgroundColor: "lightgoldenrodyellow", padding: "10px" ,border:"1px solid navy"}}>
        {/* <div>Footer</div> */}
        <h3>{title}</h3>
        {/* <h3>Phone: {phone}</h3> */}
      </div>
    </>
  );
}

export default Footer