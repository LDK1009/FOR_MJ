import * as React from "react";
import { Route, Routes } from "react-router-dom";
import SelectFood from "./pages/SelectFood";
import SelectPlayGround from "./pages/SelectPlayGround";
import Home from "./pages/Home";
// import AddFoodList from "./components/AddFoodList";
// import FoodItem from "./components/FoodItem";
// import LoadingComponent from "./components/LoadingComponent";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SelectPlayGround" element={<SelectPlayGround />} />
        <Route path="/SelectFood" element={<SelectFood />} />
      </Routes>
    </>
  );
};

export default App;
