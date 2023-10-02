import React from "react";
import { Footer_Container, Footer_Link, Footer_item } from "../styles/style";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Footer = () => {
  return (
    <>
      <Footer_Container>
        <Footer_item>
          <Footer_Link to="/">
            <FavoriteBorderOutlinedIcon />
          </Footer_Link>
        </Footer_item>
        <Footer_item>
          <Footer_Link to="/">
            <HomeOutlinedIcon />
          </Footer_Link>
        </Footer_item>
        <Footer_item>
          <Footer_Link to="/">
            <AccountCircleOutlinedIcon />
          </Footer_Link>
        </Footer_item>
      </Footer_Container>
    </>
  );
};

export default Footer;
