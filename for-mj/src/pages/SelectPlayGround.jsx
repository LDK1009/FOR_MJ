import React, { useCallback, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import LoadingComponent from "../components/LoadingComponent";
import PlayGroundItem from "../components/PlayGroundItem";
import {
  FlexBox,
  SelectPlayGround_CategoryContainer,
  SelectPlayGround_CategoryText,
  SelectPlayGround_CategoryWrap,
  SelectPlayGround_Container,
  SelectPlayGround_DataList,
  SelectPlayGround_NoDataList,
  SelectPlayGround_NoDataText,
  SelectPlayGround_Wrap,
} from "../styles/style";
import CategoryButton from "../components/CategoryButton";
import AddPlayGround from "../components/AddPlayGround";
import testimg from "../assets/공룡_로딩.jpg";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const SelectPlayGround = () => {
  const navigate = useNavigate(); // 네비게이트 훅 


  //////////////////////////////////////////////////DB//////////////////////////////////////////////////
  // 컬렉션 참조 변수
  const PlayGroundRef = collection(db, "PlayGroundList");
  // db 데이터 리스트 변수
  const [dataList, setDataList] = useState([]);

  //데이터 읽기
  const readData = useCallback(async (weather, category) => {
    try {
      const newData = [];
      let filterData = PlayGroundRef; // 기본적으로 모든 데이터를 가져옵니다.

      if (weather) {
        filterData = query(filterData, where("weather", "==", weather));
        if (category) {
          filterData = query(filterData, where("category", "==", category));
        }
      }

      if (category) {
        filterData = query(filterData, where("category", "==", category));
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

  //////////////////// showDataList가 true일 때만 데이터 리스트를 보여주기
  

  
  const renderDataList = () => {
    if (showDataList) {
      if (dataList.length === 0) {
        return (
          <>
          <SelectPlayGround_NoDataList>
            <SelectPlayGround_CategoryText>
            {weather}&emsp;/&emsp;{category}
            </SelectPlayGround_CategoryText>
            <SelectPlayGround_NoDataText>
              데이터가 없어용 😢
              <br />
              데이터를 추가해주세용!
            </SelectPlayGround_NoDataText>
          </SelectPlayGround_NoDataList>
          </>
        );
      } else {
        return (
          <>
            <SelectPlayGround_DataList>
            <SelectPlayGround_CategoryText>
            {weather}&emsp;/&emsp;{category}
            </SelectPlayGround_CategoryText>

              {dataList.map((item, index) => (
                <PlayGroundItem
                  name={item.name}
                  location={item.location}
                  hash={item.hash}
                  url={item.url}
                  key={index}
                  onClick={()=>navigate('/Diary', { state : item.name })}
                />
              ))}
            </SelectPlayGround_DataList>
          </>
        );
      }
    }
    return null; // showDataList가 false인 경우 아무것도 렌더링하지 않음
  };



  //////////////////////////////////////////////////날씨&카테고리//////////////////////////////////////////////////
  // 날씨, 카테고리 변수
  const [weather, setWeather] = useState("");
  const [category, setCategory] = useState("");

  // 데이터 리스트 보여주기 여부 변수
  const [showDataList, setShowDataList] = useState(true);

  // 날씨 선택 시 데이터 필터링&&로딩 컴포넌트 렌더링
  const weatherClick = (weather) => {
    // 데이터 리스트 숨기기
    setShowDataList(false);
    //카테고리 업데이트
    setWeather(weather);
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
  // 카테고리 선택 시 데이터 필터링&&로딩 컴포넌트 렌더링
  const categoryClick = (category) => {
    // 데이터 리스트 숨기기
    setShowDataList(false);
    // 카테고리 업데이트
    setCategory(category);
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
  // 카테고리 리셋
  // const categoryReset = () => {
  //   setWeather("");
  //   setCategory("");
  //   setShowDataList(true);
  // };

  // 카테고리 변경 시 리렌더링(변경 상태 반영)
  useEffect(() => {
    readData(weather, category);
  }, [weather, category, readData]);

  //////////////////////////////////////////////////프로그래스 바&&로딩 컴포넌트//////////////////////////////////////////////////

  // 진행도
  const [progress, setProgress] = React.useState(0);
  // 로딩 컴포넌트 렌더링 여부
  const [loadingShow, setLoadingShow] = useState(false);

  // progress 상태가 업데이트 될 때마다 렌더링 험수
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


  //////////////////////////////////////////////////렌더링//////////////////////////////////////////////////
  return (
    <>
      <SelectPlayGround_Container>
        <SelectPlayGround_Wrap>
          {/* 카테고리 */}
          <SelectPlayGround_CategoryContainer>
            <SelectPlayGround_CategoryWrap>
              <FlexBox>
                <CategoryButton
                  src={testimg}
                  label="맑음"
                  onClick={() => weatherClick("맑음")}
                />
                <CategoryButton
                  src={testimg}
                  label="구름"
                  onClick={() => weatherClick("구름")}
                />
                <CategoryButton
                  src={testimg}
                  label="비"
                  onClick={() => weatherClick("비")}
                />
                <CategoryButton
                  src={testimg}
                  label="눈"
                  onClick={() => weatherClick("눈")}
                />
              </FlexBox>
              <FlexBox>
                <CategoryButton
                  src={testimg}
                  label="액티비티"
                  onClick={() => categoryClick("액티비티")}
                />
                <CategoryButton
                  src={testimg}
                  label="힐링"
                  onClick={() => categoryClick("힐링")}
                />
                <CategoryButton
                  src={testimg}
                  label="여행"
                  onClick={() => categoryClick("여행")}
                />
                <CategoryButton
                  src={testimg}
                  label="문화"
                  onClick={() => categoryClick("문화")}
                />
              </FlexBox>
            </SelectPlayGround_CategoryWrap>
          </SelectPlayGround_CategoryContainer>

          {/* 데이터 추가 모달 */}
          <AddPlayGround />
          {/* 로딩창  */}
          {loadingShow && <LoadingComponent progress={progress} />}
          {/* 데이터 리스트 */}
          {renderDataList()}
        </SelectPlayGround_Wrap>
      </SelectPlayGround_Container>
      <Footer/>
    </>
  );
};

export default SelectPlayGround;
