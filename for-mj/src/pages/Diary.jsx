import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import DiaryItem from "../components/DiaryItem";
import { db } from "../firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import AddDiary from "../components/AddDiary";
import { useEffect } from "react";
import { FoodItem_CategoryText, FoodItem_Container, FoodItem_NoDataText } from "../styles/style";

const Diary = () => {
  //////////////////////////////////////////////////State//////////////////////////////////////////////////
  //////////////////// db 참조
  const DiaryRef = collection(db, "AllDiary");
  //////////////////// 컬렉션에서 불러온 모든 데이터
  const [allData, setAllData] = useState([]);
  //////////////////// 필터링된 데이터
  const [filteredData, setFilteredData] = useState([]);
  ////////////////////네비게이트 프롭스 설정(location.state로 사용한다.)
  const location = useLocation();
  ////////////////////홈에서 일기를 선택했을 때 디폴트 



  //////////////////////////////////////////////////파이어 스토어//////////////////////////////////////////////////
  //////////////////// AllDiary컬렉션의 모든 데이터 가져오기
  const readData = useCallback(async () => {
    try {
      const newData = [];
      const q = query(DiaryRef, orderBy("timestamp", "desc"));
      
      const querySnapshot = await getDocs(q); // 컬렉션 참조 연결
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
  //////////////////////////////////////////////////**//////////////////////////////////////////////////

  const FilteringData = () => {
    let fd = allData.filter((item)=>item.classification===location.state);
    // 홈에서 일기 버튼을 선택한 상황이라면
    if (location.state==="all") {
      setFilteredData(allData);
    }
    // SelectPlayGround에서 선택했다면
    else {
      setFilteredData(fd);
    }
  };

  const renderFilteredItem = () =>{
    if (filteredData.length===0) {
              return (
            <FoodItem_NoDataText>
              데이터가 없어용 😢
              <br />
              데이터를 추가해주세용!
            </FoodItem_NoDataText>
        ); // 데이터가 없는 경우 메시지를 표시
    }
    else{
      return (
        filteredData.map((item, index) => 
        (
          <DiaryItem
            key={index}
            date={item.date}
            descript={item.descript}
            imgsrc={item.src}
          />
        ))
      );
    }

  }
  //////////////////////////////////////////////////스토리지//////////////////////////////////////////////////

  //////////////////////////////////////////////////useEffect//////////////////////////////////////////////////
  ////////////////////마운트 시에 데이터 불러오기
  useEffect(() => {
    readData();
  }, []);

  ////////////////////데이터 불러온 후 필터링
  useEffect(() => {
    FilteringData();
  }, [allData]);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  //////////////////////////////////////////////////렌더링//////////////////////////////////////////////////
  return (
    <>
      <Container_Diary>
        <MainWrap_Diary>
          <Title_Diary>일기</Title_Diary>
          {/* 네비게이트 props */}
          <ItemWrap_Diary>
            {renderFilteredItem()}
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
