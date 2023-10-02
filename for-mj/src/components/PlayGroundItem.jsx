import React from "react";
import {
  FlexBox,
  PlayGroundItem_Container,
  PlayGroundItem_Hash,
  PlayGroundItem_Image,
  PlayGroundItem_Name,
  PlayGroundItem_Place,
  PlayGroundItem_TextWrap,
} from "../styles/style";
import imgsrc from '../assets/공룡_로딩.jpg'

const PlayGroundItem = ({ src, name, location, hash, url }) => {
  return (
    <>
      <PlayGroundItem_Container onClick={()=>window.open(url)}>
        <PlayGroundItem_Image src={imgsrc} alt="img" />
        <PlayGroundItem_TextWrap>
          <FlexBox style={{marginBottom:'3px'}}>
            <PlayGroundItem_Name>{name}</PlayGroundItem_Name>
            <PlayGroundItem_Place>{location}</PlayGroundItem_Place>
          </FlexBox>
          <PlayGroundItem_Hash>{hash}</PlayGroundItem_Hash>
        </PlayGroundItem_TextWrap>
      </PlayGroundItem_Container>
    </>
  );
};

export default PlayGroundItem;
