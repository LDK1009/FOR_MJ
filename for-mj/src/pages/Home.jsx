import React from "react";
import {
  Home_Button,
  Home_ButtonText,
  Home_ButtonWrap,
  Home_FlexBox,
  Home_FullContainer,
} from "../styles/style";
import PlaySrc from "../assets/images/home/놀거리2.png";
import MealSrc from "../assets/images/home/먹거리.png";
import PenaltySrc from "../assets/images/home/벌칙.png";
import DiarySrc from "../assets/images/home/일기.png";
import HomeButton from "../components/HomeButton";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Home_FullContainer>
        <Home_ButtonWrap>
          <Home_FlexBox>
            <HomeButton path="/SelectPlayGround" src={PlaySrc} ></HomeButton>
            <HomeButton path="/SelectFood" src={MealSrc} ></HomeButton>
          </Home_FlexBox>
          <Home_FlexBox>
            <HomeButton path="/" src={PenaltySrc} ></HomeButton>
            <HomeButton path="/Diary" src={DiarySrc}  navigateProps="all"></HomeButton>
          </Home_FlexBox>
        </Home_ButtonWrap>
      </Home_FullContainer>
        <Footer/>
    </>
  );
};

export default Home;
