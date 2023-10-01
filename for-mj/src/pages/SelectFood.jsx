import React, { useCallback, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { motion } from "framer-motion";
import LoadingComponent from "../components/LoadingComponent";
import FoodItem from "../components/FoodItem";
import AddFoodList from "../components/AddFoodList";
import { FlexBox, SelectFood_CategoryButton } from "../styles/style";
import koreafood from '../assets/한국음식.jpg';
import japanfood from '../assets/일본음식.jpg';
import chinafood from '../assets/중국음식.jpg';
import westernfood from '../assets/서양음식.jpg';
import CategoryButton from "../components/CategoryButton";
import soapdish from '../assets/국물요리.jpg';
import stirdish from '../assets/볶음요리.jpg';
import frieddish from '../assets/튀김요리.jpg';
const SelectFood = () => {
  //////////////////////////////////////////////////변수//////////////////////////////////////////////////

  ////////////////////////////////////////////////// About 파이어스토어

  // 컬렉션 참조
  const FoodListRef = collection(db, "FoodList");
  // db 데이터 리스트
  const [dataList, setDataList] = useState([]);
  // 카테고리 상태
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  // 데이터 리스트 보여주기 여부
  const [showDataList, setShowDataList] = useState(false);



  ////////////////////////////////////////////////// About 프로그래스 바

  // 진행도
  const [progress, setProgress] = React.useState(0);
  // 로딩 컴포넌트 렌더링 여부
  const [loadingShow, setLoadingShow] = useState(false);

  //////////////////////////////////////////////////함수//////////////////////////////////////////////////

  ////////////////////////////////////////////////// About 파이어스토어

  //데이터 읽기
  const readData = useCallback(async (category1, category2) => {
    try {
      const newData = [];
      let filterData = FoodListRef; // 기본적으로 모든 데이터를 가져옵니다.

      if (category1) {
        filterData = query(filterData, where("category1", "==", category1));
        if (category2) {
          filterData = query(filterData, where("category2", "==", category2));
        }
      }

      if (category2) {
        filterData = query(filterData, where("category2", "==", category2));
      }

      const querySnapshot = await getDocs(filterData);
      querySnapshot.forEach((doc) => {
        newData.push(doc.data());
      });

      setDataList(newData);
    } catch (e) {
      console.error("Error reading data: ", e);
    }
  }, []);

  // 카테고리1 클릭 시 카테고리 변경
  const category1Click = (category1) => {
    // 데이터 리스트 숨기기
    setShowDataList(false);
    //카테고리 업데이트
    setCategory1(category1);
    // 프로그래스바 초기화
    setProgress(0);
    // 로딩 컴포넌트 보이기
    setLoadingShow((prev) => !prev);
    // 로딩 컴포넌트 숨기기(2초 후)
    setTimeout(() => {
      setLoadingShow((prev) => !prev);
    }, 2000);
    //  데이터 리스트 보여주기
    setTimeout(() => {
      setShowDataList((prev) => !prev);
    }, 2000);
  };
  // 카테고리2 클릭 시 카테고리 변경
  const category2Click = (category2) => {
    // 데이터 리스트 숨기기
    setShowDataList(false);
    // 카테고리 업데이트
    setCategory2(category2);
    // 프로그래스바 초기화
    setProgress(0);
    // 로딩 컴포넌트 보이기
    setLoadingShow((prev) => !prev);
    // 로딩 컴포넌트 숨기기(2초 후)
    setTimeout(() => {
      setLoadingShow((prev) => !prev);
    }, 2000);
    //  데이터 리스트 보여주기
    setTimeout(() => {
      setShowDataList((prev) => !prev);
    }, 2000);
  };
  // 카테고리 리셋
  const categoryReset = () => {
    setCategory1("");
    setCategory2("");
  };

  // 카테고리 변경 시 재렌더링
  useEffect(() => {
    readData(category1, category2);
  }, [category1, category2, readData]);

  ////////////////////////////////////////////////// About 인풋폼




  ////////////////////////////////////////////////// About 프로그래스 바
  // progress 상태가 업데이트 될 때마다 렌더링 험수
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 120);
    return () => {
      clearInterval(timer); //이전에 생성된 타이머를 정지시키는 역할을 한다 즉, 이전 useEffect 실행에서 생성된 타이머를 정지하고 새로운 타이머를 시작하는 것을 방지합니다. 이를 통해 타이머가 중복 실행되거나 충돌하는 것을 방지하고, 원활한 프로그래스 바 업데이트를 보장합니다.
    };
  }, [progress]);

  // 데이터 리스트를 보여주는 함수
  const renderDataList = () => {
    if (showDataList) {
      return (
        <>
          <h1>데이터 리스트</h1>
          {dataList.map((item) => (
            <FoodItem name={item.name} place={item.place} hash={item.hash} key={item.id} />
          ))}
        </>
      );
    }
    return null; // showDataList가 false인 경우 아무것도 렌더링하지 않음
  };
  //////////////////////////////////////////////////렌더링//////////////////////////////////////////////////
  return (
    <>
    <FlexBox>
      <CategoryButton src={koreafood} label="한식" onClick={() => category1Click("한식")}></CategoryButton>
      <CategoryButton src={chinafood} label="중식" onClick={() => category1Click("중식")}></CategoryButton>
      <CategoryButton src={japanfood} label="일식" onClick={() => category1Click("일식")}></CategoryButton>
      <CategoryButton src={westernfood} label="양식" onClick={() => category1Click("양식")}></CategoryButton>
    </FlexBox>
      <FlexBox>

      <CategoryButton src={soapdish} label="국물" onClick={() => category2Click("국물")}>국물</CategoryButton>
      <CategoryButton src={stirdish} label="볶음" onClick={() => category2Click("볶음")}>볶음</CategoryButton>
      <CategoryButton src={frieddish} label="튀김" onClick={() => category2Click("튀김")}>튀김</CategoryButton>
      </FlexBox>
      <button onClick={categoryReset}>전체</button>
      <AddFoodList/>

      {loadingShow && <LoadingComponent progress={progress} />}
      {renderDataList()}
    </>
  );
};

export default SelectFood;
