import React from "react";
import imgsrc from "../assets/공룡_로딩.jpg";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

const LoadingComponent = ({progress}) => {
  return (
    <>
    <div style={{textAlign:'center'}}>
      <h3>AI 분석중...</h3>
      <Box sx={{ width: "400px" }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
      <img src={imgsrc} alt="img" style={{width:'400px'}}/>
      </div>
    </>
  );
};

export default LoadingComponent;
