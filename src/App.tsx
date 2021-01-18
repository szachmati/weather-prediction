import React, { useState } from "react";
import "./App.css";
import ButtonAppBar from "./app/components/AppBar";
import SignIn from "./app/components/SignIn";

function App() {
  const [show, setShown] = useState<boolean>(false);

  const handleClick = () => {
    setShown(true);
  };

  return (
    <React.Fragment>
      <ButtonAppBar onClick={handleClick} />
      {show && <SignIn />}
    </React.Fragment>
  );
}

export default App;
