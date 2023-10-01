import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LinearProgressWithLabel = (props) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* 라이너 프로그래스 바 mui */}
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          {/* 퍼센트 텍스트 */}
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

// 프로그래스 바 프롭스 타입 제한
LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };  

export default LinearProgressWithLabel;
