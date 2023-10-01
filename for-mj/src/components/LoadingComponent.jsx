import React from "react";
import imgsrc from "../assets/공룡_로딩.jpg";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

const LoadingComponent = ({progress}) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
      <img src={imgsrc} alt="img" />
    </>
  );
};

export default LoadingComponent;
