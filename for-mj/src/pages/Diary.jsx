import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import DiaryItem from "../components/DiaryItem";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import AddDiary from "../components/AddDiary";
import { useEffect } from "react";

const Diary = () => {
  //////////////////////////////////////////////////**//////////////////////////////////////////////////
  ////////////////////네비게이트 프롭스 설정(location.state로 사용한다.)
  const location = useLocation();

  const data = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const ItemList = () => {
    return allData.map((item, index) => (
      <DiaryItem
        key={index}
        date={item.date}
        descript={item.descript}
        imgsrc={item.src}
      />
    ));
  };

  //////////////////////////////////////////////////파이어 스토어//////////////////////////////////////////////////
  //////////////////// db 참조
  const DiaryRef = collection(db, location.state);

  //////////////////// 컬렉션에서 불러온 모든 데이터
  const [allData, setAllData] = useState([]);

  //////////////////// 데이터 가져오기
  const readData = useCallback(async () => {
    try {
      console.log("=====readData 함수 실행=====");
      const newData = [];
      const querySnapshot = await getDocs(DiaryRef); // 컬렉션 참조 연결

      // 컬렉션에 있는 데이터들을 모두 newData로 옮겨 담는다.
      querySnapshot.forEach((doc) => {
        newData.push(doc.data());
      });

      setAllData(newData); // allData를 newData로 복제한다.
    } catch (e) {
      // 에러 감지
      console.error("Error reading data: ", e);
    }
  }, []);

  //////////////////////////////////////////////////스토리지//////////////////////////////////////////////////


  //////////////////////////////////////////////////useEffect//////////////////////////////////////////////////
  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    ItemList();
  }, [allData]);

  //////////////////////////////////////////////////렌더링//////////////////////////////////////////////////
  return (
    <>
      <Container_Diary>
        <MainWrap_Diary>
          <Title_Diary>일___기</Title_Diary>
          {/* 네비게이트 props */}
          {location.state}
          <ItemWrap_Diary>
            {/* {data.map((ItemNum, index) => 
      (<DiaryItem key={index} number={ItemNum}/>))} */}
            {ItemList()}
          </ItemWrap_Diary>
          <AddDiary diaryName={location.state} />
        </MainWrap_Diary>
      </Container_Diary>
      <Footer />
    </>
  );
};

//////////////////////////////////////////////////스타일 컴포넌트//////////////////////////////////////////////////

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
  height: 60px;
  font-size: 40px;
  text-align: center;
  margin: 45px 0px;
`;

// 다이어리 아이템 랩
export const ItemWrap_Diary = styled.div`
  height: 530px;
  margin-bottom: 30px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  /* background-color: black;
  opacity: 0.8; */
`;

export default Diary;
