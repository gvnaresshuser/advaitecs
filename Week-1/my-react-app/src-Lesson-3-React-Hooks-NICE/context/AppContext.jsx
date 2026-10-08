import { createContext } from "react";

//STEP 1 - CREATE THE CONTEXT
export const AppContext = createContext();

const ContextProvider = (props) => {
  const phone = "+1 123456789";
  const name = "Naressh";
  const title = "© 2026 Test Company Ltd. All rights reserved.";
  return (
    /*  <AppContext.Provider value={phone}> */
    <AppContext.Provider value={{ phone, name, title }}>
      {props.children}
    </AppContext.Provider>
  );
};
export default ContextProvider;
/*
createContext is a React function used to create a Context object that allows data 
to be shared between components without having to pass props manually through 
every level of the component tree.
*/
