import React, { useCallback, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { motion } from "framer-motion";
import LoadingComponent from "../components/LoadingComponent";
import FoodItem from "../components/FoodItem";

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

  ////////////////////////////////////////////////// About 인풋폼

  // 폼 데이터 입력값
  const [formData, setFormData] = useState({
    category1: "",
    category2: "",
    name: "",
    place: "",
    hash: "",
  });

  ////////////////////////////////////////////////// About 프로그래스 바

  // 진행도
  const [progress, setProgress] = React.useState(0);
  // 로딩 컴포넌트 렌더링 여부
  const [loadingShow, setLoadingShow] = useState(false);

  //////////////////////////////////////////////////함수//////////////////////////////////////////////////

  ////////////////////////////////////////////////// About 파이어스토어
  //데이터 추가
  const createData = async () => {
    try {
      // db라는 상수에 담은 firesre에 접근하여 FoodList 컬렉션에 문서를 추가한다.
      // 문서명은 랜덤이며 문서에 들어갈 데이터는 중괄호 내부 내용과 같다
      const docRef = await addDoc(collection(db, "FoodList"), {
        category1: formData.category1,
        category2: formData.category2,
        name: formData.name,
        place: formData.place,
        hash: formData.hash,
        timestamp: new Date(),
      });
      // 작업 성공 시 문서의 id 즉, 문서명을 콘솔 출력한다
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
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

  // 인풋 입력값 감지 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 현재 입력 필드의 name과 value를 가져옵니다.

    setFormData({
      ...formData,
      [name]: value, // 해당 필드의 값을 업데이트합니다.
    });
  };

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
      <button onClick={() => category1Click("한식")}>한식</button>
      <button onClick={() => category1Click("중식")}>중식</button>
      <button onClick={() => category1Click("일식")}>일식</button>
      <button onClick={() => category1Click("양식")}>양식</button>
      <br />
      <button onClick={() => category2Click("국물")}>국물</button>
      <button onClick={() => category2Click("볶음")}>볶음</button>
      <button onClick={() => category2Click("튀김")}>튀김</button>
      <button onClick={categoryReset}>전체</button>
      <input
        name="category1"
        value={formData.category1}
        onChange={handleChange}
        placeholder="카테고리1"
      />
      <input
        name="category2"
        value={formData.category2}
        onChange={handleChange}
        placeholder="카테고리2"
      />
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <input
        name="place"
        value={formData.place}
        onChange={handleChange}
        placeholder="장소"
      />
      <input
        name="hash"
        value={formData.hash}
        onChange={handleChange}
        placeholder="해시태그"
      />
      <button onClick={createData}>추가</button>
      {loadingShow && <LoadingComponent progress={progress} />}
      {renderDataList()}
    </>
  );
};

export default SelectFood;
