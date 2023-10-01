import React from "react";
import {
  FlexBox,
  FoodItem_Container,
  FoodItem_Hash,
  FoodItem_Image,
  FoodItem_Name,
  FoodItem_Place,
  FoodItem_TextWrap,
} from "../styles/style";
import imgsrc from '../assets/공룡_로딩.jpg'

const FoodItem = ({ src, name, place, hash }) => {
  return (
    <>
      <FoodItem_Container>
        <FoodItem_Image src={imgsrc} alt="img" />
        <FoodItem_TextWrap>
          <FlexBox style={{marginBottom:'3px'}}>
            <FoodItem_Name>{name}</FoodItem_Name>
            <FoodItem_Place>{place}</FoodItem_Place>
          </FlexBox>
          <FoodItem_Hash>{hash}</FoodItem_Hash>
        </FoodItem_TextWrap>
      </FoodItem_Container>
    </>
  );
};

export default FoodItem;
