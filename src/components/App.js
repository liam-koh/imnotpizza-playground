import React from "react";
import Header from "./Header";
import Aladin from "../Screens/Aladin";
import LionKing from "../Screens/LionKing";
import Routes from "./Routes";

function App() {
  return (
    <div>
      Movie Theaters
      <Header />
     
      <Routes></Routes>
    </div>
  );
}

export default App;
