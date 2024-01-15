import React, { useCallback, useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import LoadingComponent from "../components/LoadingComponent";
import AddFoodList from "../components/AddFoodList";
import {
  FlexBox,
  FoodItem_CategoryText,
  FoodItem_Container,
  FoodItem_NoDataText,
  SelectFood_CategoryContainer,
  SelectFood_CategoryWrap,
  SelectFood_Container,
  SelectFood_JustifyCenter,
  SelectFood_Wrap,
} from "../styles/style";
import koreafood from "../assets/images/food/한식.png";
import japanfood from "../assets/images/food/일식.png";
import chinafood from "../assets/images/food/중식.png";
import westernfood from "../assets/images/food/양식.png";
import CategoryButton from "../components/CategoryButton";
import schoolfood from "../assets/images/food/분식.png";
import snack from "../assets/images/food/간식.png";
import Footer from "../components/Footer";
import FoodItem from "../components/FoodItem";

const SelectFood = () => {
  ////////////////////////////////////////////////// 변수 About 파이어스토어
  //////////////////// db 참조
  const FoodListRef = collection(db, "FoodList");
  //////////////////// 모든 DB 데이터
  const [allData, setAllData] = useState([]);
  //////////////////// 필터링 된 데이터
  const [filteredData, setFilteredData] = useState({});
  //////////////////// 랜덤하게 뽑은 데이터 1개
  const [randomedData, setRandomedData] = useState({});
  //////////////////// 카테고리 선택 상태
  const [category1, setCategory1] = useState(null);
  //////////////////// 로드한 이미지의 src

  ////////////////////////////////////////////////// 함수 About 파이어스토어
  //////////////////// 데이터 읽기
  const readData = useCallback(async () => {
    try {
      console.log("=====readData 함수 실행=====");
      const newData = [];
      const querySnapshot = await getDocs(FoodListRef);

      querySnapshot.forEach((doc) => {
        newData.push(doc.data());
      });

      setAllData(newData); // allData를 읽은 데이터로 세팅
    } catch (e) {
      console.error("Error reading data: ", e);
    }
  }, []);

  //////////////////////////// 테스트 코드
  useEffect(() => {
    console.log(allData);
  }, [allData]);
  ///////////////////////////////


  //////////////////// 데이터 필터링
  const filterData = (P_allData, P_category1 = null) => {
    let returnData = [];

    // 카테고리1이 설정되어 있을 경우
    if (P_category1) {
        returnData = P_allData.filter((item) => {
          return item.category1 === P_category1;
        });
    }

    console.log("returnData값 >> " + returnData);
    // 데이터 랜덤화
    const randomNumber = Math.round(Math.random() * (returnData.length - 1)); // 0이상 ~ 배열 크기 미만의 무작위 정수 생성
    setFilteredData(() => returnData[randomNumber]); // 필터링 된 데이터 중 무작위 인덱스의 데이터를 randomedData에 넣는다
    console.log(filteredData);
  };

  //////////////////// 카테고리1 클릭 시 카테고리 변경
  const category1Click = (category1) => {
    //카테고리 업데이트
    setCategory1(() => category1);
    // 데이터 리스트 숨기기
    setShowDataList(false);
    // 프로그래스바 초기화
    setProgress(0);
    // 로딩 컴포넌트 보이기
    setLoadingShow((prev) => !prev);
    // 로딩 컴포넌트 숨기기(2초 후)
    setTimeout(() => {
      setLoadingShow((prev) => !prev);
    }, 1000);
    //  데이터 리스트 보여주기
    setTimeout(() => {
      setShowDataList((prev) => !prev);
    }, 1000);
  };

  ////////////////////////////////////////////////// 변수 About 스토리지

  //////////////////// 다운로드한 이미지 url
  const [loadedImgSrc, setLoadedImgSrc] = useState(
    "FoodListImages/김치찌개.jpg"
  );

  //////////////////// 다운로드할 이미지의 스토리지 경로
  // const [storageImagePath, setStorageImagePath] = useState(null);

  ////////////////////////////////////////////////// 함수 About 스토리지
  const LoadImage = (storageImagePath) => {
    const pathReference = ref(storage, `FoodListImages/${storageImagePath}`);
    getDownloadURL(pathReference)
      .then((url) => {
        setLoadedImgSrc(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ////////////////////////////////////////////////// 변수 About 프로그래스 바

  //////////////////// 진행도
  const [progress, setProgress] = React.useState(0);
  //////////////////// 로딩 컴포넌트 렌더링 여부
  const [loadingShow, setLoadingShow] = useState(false);

  ////////////////////////////////////////////////// 함수 About 프로그래스 바
  //////////////////// progress 상태가 업데이트 될 때마다 렌더링 험수
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 80);
    return () => {
      clearInterval(timer); //이전에 생성된 타이머를 정지시키는 역할을 한다 즉, 이전 useEffect 실행에서 생성된 타이머를 정지하고 새로운 타이머를 시작하는 것을 방지합니다. 이를 통해 타이머가 중복 실행되거나 충돌하는 것을 방지하고, 원활한 프로그래스 바 업데이트를 보장합니다.
    };
  }, [progress]);

  ////////////////////////////////////////////////// 변수 About 렌더링
  //////////////////// 데이터 보여주기 여부
  const [showDataList, setShowDataList] = useState(true);

  ////////////////////////////////////////////////// 함수 About 렌더링
  //////////////////// 데이터 리스트를 보여주는 함수
  const renderDataList = () => {
    if (showDataList) {
      if (filteredData && filteredData.name && filteredData.descript) {
        // randomData가 존재하고 name 속성이 있는지 확인
        return (
          <>
            <FoodItem
              menuText={filteredData.name} // filteredData를 사용
              descript={filteredData.descript} // filteredData를 사용
              ImgSrc={loadedImgSrc}
            />
          </>
        );
      } else {
        return (
          <FoodItem_Container>
            <FoodItem_CategoryText>
              {category1}
            </FoodItem_CategoryText>
            <FoodItem_NoDataText>
              데이터가 없어용 😢
              <br />
              데이터를 추가해주세용!
            </FoodItem_NoDataText>
          </FoodItem_Container>
        ); // 데이터가 없는 경우 메시지를 표시
      }
    }
    return null; // showDataList가 false인 경우 아무것도 렌더링하지 않음
  };

  ////////////////////////////////////////////////// About useEffect
  //////////////////// 마운트 시 실행
  useEffect(() => {
    console.log("=====새로고침 useEffect 테스트=====");
    readData();
  }, []);

  //////////////////// 읽은 데이터 추적
  useEffect(() => {
    console.log("받아온 데이터 출력 테스트");
    console.log(allData);
  }, [allData]);

  //////////////////// 카테고리 변경 시 데이터 재필터링
  useEffect(() => {
    //필터링
    filterData(allData, category1);
  }, [category1]);

  //////////////////// 필터링 된 데이터 변경 시 이미지 불러오기
  useEffect(() => {
    if (filteredData && filteredData.src) {
      LoadImage(filteredData.src);
    }
  }, [filteredData]);

  //////////////////////////////////////////////////렌더링//////////////////////////////////////////////////
  return (
    <>
      <SelectFood_Container>
        <SelectFood_Wrap>
          <SelectFood_JustifyCenter>
            <SelectFood_CategoryContainer>
              {/* 카테고리 버튼 */}
              <SelectFood_CategoryWrap>
                <div>
                  <FlexBox>
                    <CategoryButton
                      src={koreafood}
                      onClick={() => category1Click("한식")}
                    ></CategoryButton>
                    <CategoryButton
                      src={chinafood}
                      onClick={() => category1Click("중식")}
                    ></CategoryButton>
                    <CategoryButton
                      src={japanfood}
                      onClick={() => category1Click("일식")}
                    ></CategoryButton>
                  </FlexBox>
                  <FlexBox>
                    <CategoryButton
                      src={westernfood}
                      onClick={() => category1Click("양식")}
                    >
                      양식
                    </CategoryButton>
                    <CategoryButton
                      src={schoolfood}
                      onClick={() => category1Click("분식")}
                    >
                      분식
                    </CategoryButton>
                    <CategoryButton
                      src={snack}
                      onClick={() => category1Click("간식")}
                    >
                      간식
                    </CategoryButton>
                  </FlexBox>
                  {/* <button onClick={categoryReset}>전체</button> */}
                </div>
              </SelectFood_CategoryWrap>
            </SelectFood_CategoryContainer>
          </SelectFood_JustifyCenter>
          {/* 데이터 추가하기 버튼 */}
          <AddFoodList />
          {/* 보여줄 데이터 */}
          {loadingShow && <LoadingComponent progress={progress} />}
          {renderDataList()}
        </SelectFood_Wrap>
      </SelectFood_Container>
      <Footer />
    </>
  );
};

export default SelectFood;
