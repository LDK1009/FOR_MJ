import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import SelectFood from "./pages/SelectFood";
import SelectPlayGround from "./pages/SelectPlayGround";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import { BrowserRouter as Router } from "react-router-dom"; // Remove the redundant 'Route' import

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SelectPlayGround" element={<SelectPlayGround />} />
          <Route path="/SelectFood" element={<SelectFood />} />
          <Route path="/Diary" element={<Diary />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
