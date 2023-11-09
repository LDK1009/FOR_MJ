import React from "react";
import {
  Home_Button,
  Home_ButtonText,
  Home_ButtonWrap,
  Home_FlexBox,
  Home_FullContainer,
} from "../styles/style";
import PlaySrc from "../assets/홈_놀거리.jpg";
import MealSrc from "../assets/홈_식사.jpg";
import PenaltySrc from "../assets/홈_벌칙.jpg";
import DiarySrc from "../assets/홈_일기.jpg";
import HomeButton from "../components/HomeButton";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Home_FullContainer>
        <Home_ButtonWrap>
          <Home_FlexBox>
            <HomeButton path="/SelectPlayGround" src={PlaySrc} text="놀거리"></HomeButton>
            <HomeButton path="/SelectFood" src={MealSrc} text="먹거리"></HomeButton>
          </Home_FlexBox>
          <Home_FlexBox>
            <HomeButton path="/" src={PenaltySrc} text="벌칙"></HomeButton>
            <HomeButton path="/Diary" src={DiarySrc} text="일기"></HomeButton>
          </Home_FlexBox>
        </Home_ButtonWrap>
      </Home_FullContainer>
        <Footer/>
    </>
  );
};

export default Home;
