import styled from "styled-components";

export const FlexBox = styled.div`
  display: flex;
  align-items:center;
`;

//////////////////////////////////////////////////FoodItem//////////////////////////////////////////////////
export const FoodItem_Container = styled.div`
  //위치
  //정렬
  display:flex;
  align-items:center;
  margin:0 auto;
  //크기
  width: 300px;
  height: 65px;
  //디자인
  background-color: gray;
`;

export const FoodItem_Image = styled.img`
  //위치
  //정렬
  //크기
  width: 50px;
  height: 50px;
  margin: 0 10px;
  //디자인
  border-radius: 100%;
`;

export const FoodItem_Name = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-right:5px;
`;

export const FoodItem_Place = styled.div`
  font-size: 10px;
`;

export const FoodItem_Hash = styled.div`
    font-size:8px;
`

export const FoodItem_TextWrap = styled.div`
`
