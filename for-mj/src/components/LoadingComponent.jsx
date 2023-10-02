import React from "react";
import imgsrc from "../assets/공룡_로딩.jpg";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { LoadingComponent_Container } from "../styles/style";

const LoadingComponent = ({progress}) => {
  return (
    <>
    <LoadingComponent_Container>
    <div style={{textAlign:'center'}}>
      <h2>AI 분석중...</h2>
      <Box sx={{ width: "100%" }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
      <img src={imgsrc} alt="img" style={{width:'100%'}}/>
      </div>
      </LoadingComponent_Container>

    </>
  );
};

export default LoadingComponent;
