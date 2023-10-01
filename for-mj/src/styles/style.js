import { Box, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

export const FlexBox = styled.div`
  display: flex;
  align-items:center;
`;

//////////////////////////////////////////////////FoodItem//////////////////////////////////////////////////
export const SelectFood_CategoryBtton =styled.img`
    background-color:
`

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

//////////////////////////////////////////////////AddFoodList_Input//////////////////////////////////////////////////

export const AddFoodList_Input = styled(TextField)`
    margin-bottom:15px;
`

export const AddFoodList_ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  background-color: white;
  border: 2px solid gray;
  border-radius:20px;
  padding: 25px;
`

export const AddFoodList_Button = styled(Button)`
    background-color:#BCD2A1;
    color:white;
    font-size:15px;
    font-weight:bold;
    width:200px;
    &:hover{
        background-color:#BCD2A1;
        opacity:0.9;
    }
`