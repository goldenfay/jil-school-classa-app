import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
const Auth = (props) => {
  const [authMode, setAuthMode] = useState(true);
  
  
  

  const switchAuthMode = () => {
    setAuthMode((prevMode) => !prevMode);
  };
  return (
    <div>
      {authMode ? (
        <Login switchAuthMode={switchAuthMode} {...props} />
      ) : (
        <Signup switchAuthMode={switchAuthMode} {...props}/>
      )}
    </div>
  );
};

export default Auth;
