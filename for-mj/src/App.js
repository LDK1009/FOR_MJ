import * as React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import SelectFood from "./pages/SelectFood";
import SelectPlayGround from "./pages/SelectPlayGround";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import { BrowserRouter as Router } from "react-router-dom"; // Remove the redundant 'Route' import
import Penalty from "./pages/Penalty";

const App = () => {
  return (
    <>
    {/* 도메인 오류 해결! */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SelectPlayGround" element={<SelectPlayGround />} />
          <Route path="/SelectFood" element={<SelectFood />} />
          <Route path="/Diary" element={<Diary />} />
          <Route path="/Penalty" element={<Penalty />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
