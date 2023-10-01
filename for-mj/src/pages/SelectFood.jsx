import React, { useCallback, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { motion } from "framer-motion";
import LoadingComponent from "../components/LoadingComponent";

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

  ////////////////////////////////////////////////// About 인풋폼

  // 폼 데이터 입력값
  const [formData, setFormData] = useState({
    category1: "",
    category2: "",
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
        timestamp: new Date(),
      });
      // 작업 성공 시 문서의 id 즉, 문서명을 콘솔 출력한다
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  //데이터 읽기
  const readData = useCallback(
    async (category1, category2) => {
      const newData = []; // 옮겨닮을 배열
      let filterData = null;

      switch (category1) {
        case "한식":
          switch (category2) {
            case "국물":
              filterData = query(
                FoodListRef,
                where("category1", "==", "한식"),
                where("category2", "==", "국물")
              );
              break;
            case "볶음":
              filterData = query(
                FoodListRef,
                where("category1", "==", "한식"),
                where("category2", "==", "볶음")
              );
              break;
            case "튀김":
              filterData = query(
                FoodListRef,
                where("category1", "==", "한식"),
                where("category2", "==", "튀김")
              );
              break;
            default:
              filterData = query(FoodListRef, where("category1", "==", "한식"));
          }
          break;
        case "중식":
          switch (category2) {
            case "국물":
              filterData = query(
                FoodListRef,
                where("category1", "==", "중식"),
                where("category2", "==", "국물")
              );
              break;
            case "볶음":
              filterData = query(
                FoodListRef,
                where("category1", "==", "중식"),
                where("category2", "==", "볶음")
              );
              break;
            case "튀김":
              filterData = query(
                FoodListRef,
                where("category1", "==", "중식"),
                where("category2", "==", "튀김")
              );
              break;
            default:
              filterData = query(FoodListRef, where("category1", "==", "중식"));
          }
          break;
        case "일식":
          switch (category2) {
            case "국물":
              filterData = query(
                FoodListRef,
                where("category1", "==", "일식"),
                where("category2", "==", "국물")
              );
              break;
            case "볶음":
              filterData = query(
                FoodListRef,
                where("category1", "==", "일식"),
                where("category2", "==", "볶음")
              );
              break;
            case "튀김":
              filterData = query(
                FoodListRef,
                where("category1", "==", "일식"),
                where("category2", "==", "튀김")
              );
              break;
            default:
              filterData = query(FoodListRef, where("category1", "==", "일식"));
          }
          break;
        case "양식":
          switch (category2) {
            case "국물":
              filterData = query(
                FoodListRef,
                where("category1", "==", "양식"),
                where("category2", "==", "국물")
              );
              break;
            case "볶음":
              filterData = query(
                FoodListRef,
                where("category1", "==", "양식"),
                where("category2", "==", "볶음")
              );
              break;
            case "튀김":
              filterData = query(
                FoodListRef,
                where("category1", "==", "양식"),
                where("category2", "==", "튀김")
              );
              break;
            default:
              filterData = query(FoodListRef, where("category1", "==", "양식"));
          }
          break;
        default:
          filterData = query(FoodListRef);
      }

      const querySnapshot = await getDocs(filterData); //FoodList 컬렉션에 있는 모든 doc들을 배열 형태로 담는다 (비동기 처리)
      querySnapshot.forEach((doc) => {
        // 배열을 순회하며 모든 데이터를 출력한다
        newData.push(doc.data());
        console.log(newData);
        setDataList(newData); // 가져온 데이터로 상태(State)를 업데이트합니다.
      });
    },
    [FoodListRef]
  );

  // 카테고리 클릭 시 카테고리 변경
  const categoryClick = (category1, category2) => {
    setCategory1(category1);
    setCategory2(category2);
    // 프로그래스바 초기화
    setProgress(0);
    // 로딩 컴포넌트 보이기
    setLoadingShow((prev) => !prev);
    // 로딩 컴포넌트 숨기기(2초 후)
    setTimeout(() => {
      setLoadingShow((prev) => !prev);
    }, 2000);
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

  //////////////////////////////////////////////////렌더링//////////////////////////////////////////////////
  return (
    <>
      <h1>데이터 리스트</h1>
      {dataList.map((item) => (
        <div style={{ border: "1px solid black" }}>
          {item.category1}
          {item.category2}
        </div>
      ))}
      <button onClick={() => categoryClick("한식", "")}>한식</button>
      <button onClick={() => categoryClick("중식", "")}>중식</button>
      <button onClick={() => categoryClick("일식", "")}>일식</button>
      <button onClick={() => categoryClick("양식", "")}>양식</button>
      <br />
      <button onClick={() => categoryClick("", "국물")}>국물</button>
      <button onClick={() => categoryClick("", "볶음")}>볶음</button>
      <button onClick={() => categoryClick("", "튀김")}>튀김</button>
      <input
        name="category1"
        value={formData.category1}
        onChange={handleChange}
      />
      <input
        name="category2"
        value={formData.category2}
        onChange={handleChange}
      />
      <button onClick={createData}>추가</button>
      {loadingShow && <LoadingComponent progress={progress} />}
    </>
  );
};

export default SelectFood;
