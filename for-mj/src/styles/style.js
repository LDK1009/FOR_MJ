import { Box, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

//////////////////////////////////////////////////CategoryButton//////////////////////////////////////////////////
export const CategoryButton_Container = styled.div`
  text-align: center;
  margin: 5px 5px;
`;
export const CategoryButton_image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

export const CategoryButton_Label = styled.div`
  font-size: 10px;
  font-weight: bold;
`;
//////////////////////////////////////////////////FoodItem//////////////////////////////////////////////////
export const PlayGroundItem_Container = styled.div`
  //위치
  //정렬
  display: flex;
  align-items: center;
  margin: 0 auto;
  //크기
  width: 260px;
  height: 65px;
  margin-bottom: 20px;
  //디자인
  background-color: #dfeecc;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px lightgray;
`;

export const PlayGroundItem_Image = styled.img`
  //위치
  //정렬
  //크기
  width: 50px;
  height: 50px;
  margin: 0 10px;
  //디자인
  border-radius: 100%;
`;

export const PlayGroundItem_Name = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin: 5px 0px 3px 20px;
`;

export const PlayGroundItem_Place = styled.div`
  font-size: 10px;
  margin: 3px;
  margin-left: 20px;
  &:hover{
    cursor:pointer;
  }
`;

export const PlayGroundItem_Hash = styled.div`
  font-size: 8px;
  margin: 3px;
  margin-left: 20px;
`;

export const PlayGroundItem_TextWrap = styled.div``;

//////////////////////////////////////////////////AddFoodList_Input//////////////////////////////////////////////////

export const AddFoodList_Input = styled(TextField)`
  margin-bottom: 15px;
`;

export const AddFoodList_ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  background-color: white;
  border: 2px solid gray;
  border-radius: 20px;
  padding: 25px;
`;

export const AddFoodList_Button = styled(Button)`
  background-color: #bcd2a1;
  color: white;
  font-size: 15px;
  font-weight: bold;
  width: 200px;
  &:hover {
    background-color: #bcd2a1;
    opacity: 0.9;
  }
`;

export const AddFoodList_ModalButton = styled(AddFoodList_Button)`
  background-color: #79ac78;
  height: 30px;
  box-shadow: 2px 2px 1px 0.001px #A3CBA4;
`;

//////////////////////////////////////////////////SelectPlayGround//////////////////////////////////////////////////
export const SelectPlayGround_Container = styled.div`
  display: flex;
  justify-content: center;
`;
export const SelectPlayGround_Wrap = styled.div``;

export const SelectPlayGround_CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 45px 0px;
  background-color: #d0e7d2;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 1px 1px 3px 1px #e5fde5;
`;
export const SelectPlayGround_CategoryWrap = styled.div`
  width: 280px;
`;

export const SelectPlayGround_DataList = styled.div`
  width: 260px;
  height: 330px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 20px;
  background-color: #f8f0e5;
  margin: 20px 0px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px lightgray;
`;

export const SelectPlayGround_NoDataList = styled(SelectPlayGround_DataList)`
  height: auto;
`;

export const SelectPlayGround_CategoryText = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: coral;
  margin-bottom: 20px;
`;

export const SelectPlayGround_NoDataText = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

//////////////////////////////////////////////////LoadingComponent//////////////////////////////////////////////////
export const LoadingComponent_Container = styled(SelectPlayGround_DataList)`
  display: flex;
  justify-content: center;
  width: 260px;
  padding: 20px;
  margin: 20px 0px;
`;
//////////////////////////////////////////////////Home//////////////////////////////////////////////////
export const Home_FullContainer = styled(Grid)`
  width: 400px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Home_ButtonWrap = styled.div`
  margin: 0px 40px;
`;

export const Home_FlexBox = styled(FlexBox)`
  margin-right: 20px;
`;

//////////////////////////////////////////////////HomeButton//////////////////////////////////////////////////
export const HomeButton_Container = styled.div`
  margin: 10px;
  &:hover {
    opacity: 0.9;
  }
`;

export const HomeButton_Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50px;
  background-color: #fff8ea;
  &:hover {
  }
`;
export const HomeButton_Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const HomeButton_Link = styled(Link)`
  text-decoration: none;
  color: black;
`;

//////////////////////////////////////////////////Footer//////////////////////////////////////////////////
export const Footer_Container = styled.div`
  background-color: #dfeecc;
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  padding: 10px 0px;
  width: 100%;
  height: 30px;
`;

export const Footer_item = styled.div`
  margin: 0 auto;
`;

export const Footer_Link = styled(Link)`
  text-decoration: none;
  color: black;
`;
//////////////////////////////////////////////////FoodItem//////////////////////////////////////////////////
export const FoodItem_Container = styled.div`
  width: 260px;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: #f8f0e5;
  margin: 20px 0px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px lightgray;
`;
export const FoodItem_Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
export const FoodItem_Image = styled.img`
  border-radius: 100%;
  width: 200px;
  height: 200px;
  margin: 30px 0px;
`;
export const FoodItem_MenuText = styled.div`
  font-size: 25px;
  font-weight: bold;
`;
export const FoodItem_Descript = styled.div`
  font-size: 20px;
  margin-top: 15px;
`;

export const FoodItem_CategoryText = styled(SelectPlayGround_CategoryText)``;

export const FoodItem_NoDataText = styled(SelectPlayGround_NoDataText)``;
//////////////////////////////////////////////////SelectFood//////////////////////////////////////////////////
export const SelectFood_CategoryWrap = styled.div`
  display:flex;
  justify-content:center;
`
export const SelectFood_CategoryContainer = styled(SelectPlayGround_CategoryContainer)`
  display:inline-block;
  padding:10px 20px;
`

export const SelectFood_JustifyCenter = styled.div`
  display:flex;
  justify-content:center;
`


export const SelectFood_Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const SelectFood_Wrap = styled.div``;
