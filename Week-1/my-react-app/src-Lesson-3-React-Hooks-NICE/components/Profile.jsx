//rafce
import React,{useContext} from 'react'
import Contact from './Contact';
import { AppContext } from "../context/AppContext";

const Profile = () => {
    const { phone } = useContext(AppContext);
  return (
    <>
    <div style={{ width: "20%", backgroundColor: "lightcoral", padding: "10px" ,border:"1px solid navy"}}>
    Profile</div>
    Mobile:{phone}
    <Contact/>
      </>
  )
}

export default Profile