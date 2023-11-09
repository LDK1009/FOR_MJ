import styled from "@emotion/styled";
import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import DiaryItem from "../components/DiaryItem";
import AddIcon from '@mui/icons-material/Add';

const Diary = () => {
  ////////////////////navigate로 받은 props
  const location = useLocation();
  console.log(location.state);

  const data = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const ItemList = () => {
    return data.map((ItemNum, index) => (
      <DiaryItem key={index} number={ItemNum} />
    ));
  };

  return (
    <>
      {/* {location.state} */}
      <Container_Diary>
        <MainWrap_Diary>
          <Title_Diary>일___기</Title_Diary>
          <ItemWrap_Diary>
            {/* {data.map((ItemNum, index) => 
      (<DiaryItem key={index} number={ItemNum}/>))} */}
            {ItemList()}
          </ItemWrap_Diary>
          <AddIcon_Diary/>
        </MainWrap_Diary>
      </Container_Diary>
      <Footer />
    </>
  );
};

// 컨테이너(배경)
export const Container_Diary = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

// 모든 컴포넌트 담는 랩(가운데 정렬)
export const MainWrap_Diary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 타이틀
export const Title_Diary = styled.div`
  height:60px;
  font-size: 40px;
  text-align: center;
  margin: 45px 0px;
`;

// 다이어리 아이템 랩
export const ItemWrap_Diary = styled.div`
  height: 530px;
  margin-bottom:30px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  /* background-color: black;
  opacity: 0.8; */
`;

export const AddIcon_Diary = styled(AddIcon)`
  font-size:40px;
  color:#625B5B;
  background-color:#BCD2A1;
  border-radius:100%;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
`


export default Diary;
