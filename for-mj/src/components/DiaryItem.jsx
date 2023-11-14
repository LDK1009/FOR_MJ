import { getDownloadURL, ref } from "firebase/storage";
import React, { useState } from "react";
import { useEffect } from "react";
import { storage } from "../firebase-config";
import styled from "@emotion/styled";
import { FlexBox } from "../styles/style";

const DiaryItem = ({ date, descript, imgsrc }) => {
  // 다운 받은 이미지 src
  const [loadedImgSrc, setLoadedImgSrc] = useState("");

  //이미지 불러오기
  const LoadImage = () => {
    const pathReference = ref(storage, `DiaryImages/${imgsrc}`);
    getDownloadURL(pathReference)
      .then((url) => {
        setLoadedImgSrc(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 마운트 시에 이미지 로드
  useEffect(() => {
    LoadImage();
  }, []);
  return (
    <>
      <Container_DiaryItem>
          <TextContentsWrap_DiaryItem>
            <Date_DiaryItem>날짜:{date}</Date_DiaryItem>
            <Descript_DiaryItem>일기:{descript}무지막지무지막지무지막지무지막지무지막지무지막지무지막지무지막지무지막지무지막지무지막지무지막지무지막지무지막지무지막지</Descript_DiaryItem>
          </TextContentsWrap_DiaryItem>
          {/* 좌우측 정렬을 위한 div */}
          <div style={{flexGrow:'1'}}></div> 
          <Img_DiaryItem src={loadedImgSrc} />
      </Container_DiaryItem>
    </>
  );
};

export const Container_DiaryItem = styled.div`
  width: 350px;
  height: 130px;
  margin-bottom: 20px;
  background-color: #f8f0e5;
  border: 1px solid #aa9999;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:15px;
`;

export const Date_DiaryItem = styled.div`
  height: 25px;
  margin-bottom:10px;
`;

export const Descript_DiaryItem = styled.div`
  height:80px;
  overflow:auto;
  /* Chrome, Safari, Opera*/
  ::-webkit-scrollbar {
    display: none; 
}
`;

export const TextContentsWrap_DiaryItem = styled.div`
  width:200px;
  align-self:flex-start;
`;

export const Img_DiaryItem = styled.img`
  width: 100px;
  height:100px;
`;

export default DiaryItem;
