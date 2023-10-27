import React from "react";
import {
  FoodItem_Container,
  FoodItem_Descript,
  FoodItem_Image,
  FoodItem_MenuText,
  FoodItem_Title,
  FoodItem_Wrap,
} from "../styles/style";

const FoodItem = ({ src, menuText, descript }) => {
  return (
      <FoodItem_Container>
        <FoodItem_Title>오늘의 메뉴는?</FoodItem_Title>
        <FoodItem_Image alt="menuImage" />
        <FoodItem_MenuText>{menuText}</FoodItem_MenuText>
        <FoodItem_Descript>{descript}</FoodItem_Descript>
      </FoodItem_Container>
  );
};

export default FoodItem;