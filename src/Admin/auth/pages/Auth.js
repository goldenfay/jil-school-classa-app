import React, { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
const Auth = () => {
  const [authMode, setAuthMode] = useState(true);

  const switchAuthMode = () => {
    setAuthMode((prevMode) => !prevMode);
  };
  return (
    <div>
      {authMode ? (
        <Login switchAuthMode={switchAuthMode} />
      ) : (
        <Signup switchAuthMode={switchAuthMode} />
      )}
    </div>
  );
};

export default Auth;
