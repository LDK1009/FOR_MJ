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

const PlayGroundItem = ({ onClick, src, name, location, hash, url }) => {
  return (
    <>
      <PlayGroundItem_Container onClick={onClick}>
        <PlayGroundItem_TextWrap>
          <PlayGroundItem_Name>{name}</PlayGroundItem_Name>
          <PlayGroundItem_Place onClick={() => window.open(url)}>{location}</PlayGroundItem_Place>
          <PlayGroundItem_Hash>{hash}</PlayGroundItem_Hash>
        </PlayGroundItem_TextWrap>
      </PlayGroundItem_Container>
    </>
  );
};

export default PlayGroundItem;
