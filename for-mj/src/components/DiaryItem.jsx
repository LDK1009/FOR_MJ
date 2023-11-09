import React from "react";
import styled from "styled-components";

const DiaryItem = ({number}) => {
  return (
    <>
      <Container_DiaryItem>
        {number}
      </Container_DiaryItem>
    </>
  );
};

export const Container_DiaryItem = styled.div`
    width:350px;
    height:130px;
    margin-bottom:20px;
    background-color:#F8F0E5;
    border:1px solid #AA9999;
`

export default DiaryItem;
