import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FlexBox,
  AddFoodList_Input,
  AddFoodList_ModalBox,
  AddFoodList_Button,
  AddFoodList_ModalButton,
} from "../styles/style";

const AddPlayGround = () => {
  //////////////////////////////////////////////////모달//////////////////////////////////////////////////

  // 모달 창 열기&닫기 state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //////////////////////////////////////////////////인풋//////////////////////////////////////////////////

  //인풋 입력값 감지 및 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 현재 입력 필드의 name과 value를 가져옵니다.

    setFormData({
      ...formData,
      [name]: value, // 해당 필드의 값을 업데이트합니다.
    });
  };
  //////////////////////////////////////////////////DB//////////////////////////////////////////////////

  // db에 추가할 폼 데이터
  const [formData, setFormData] = useState({
    weather: "",
    category: "",
    name: "",
    location: "",
    hash: "",
    url: "",
  });

  //데이터 추가
  const createData = async () => {
    try {
      // db라는 상수에 담은 firesre에 접근하여 FoodList 컬렉션에 문서를 추가한다.
      // 문서명은 랜덤이며 문서에 들어갈 데이터는 중괄호 내부 내용과 같다
      const docRef = await addDoc(collection(db, "PlayGroundList"), {
        weather: formData.weather,
        category: formData.category,
        name: formData.name,
        location: formData.location,
        hash: formData.hash,
        url: formData.url,
        timestamp: new Date(),
      });
      setFormData({
        weather: "",
        category: "",
        name: "",
        location: "",
        hash: "",
        url: "",
      });
      // 작업 성공 시 문서의 id 즉, 문서명을 콘솔 출력한다
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  //////////////////////////////////////////////////렌더링//////////////////////////////////////////////////

  return (
    <>
      {/* 클릭 전 보여줄 내용 작성(클릭 시 open state를 true로 변경하여 모달 창을 연다) */}
      <FlexBox style={{justifyContent:'center'}}>
      <AddFoodList_ModalButton onClick={handleOpen}>데이터 추가하기</AddFoodList_ModalButton>
      </FlexBox>
      <Modal open={open} onClose={handleClose}>
        <AddFoodList_ModalBox>
          <FlexBox style={{ flexDirection: "column" }}>
            <AddFoodList_Input
              id="standard-basic"
              label="날씨"
              variant="standard"
              name="weather"
              value={formData.weather}
              onChange={handleChange}
              placeholder="ex) 맑음, 구름, 비, 눈"
            />
            <AddFoodList_Input
              id="standard-basic"
              label="카테고리"
              variant="standard"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="ex) 액티비티, 힐링, 여행, 문화"
            />
            <AddFoodList_Input
              id="standard-basic"
              label="업소명"
              variant="standard"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ex) 예당호 모노레일"
            />
            <AddFoodList_Input
              id="standard-basic"
              label="위치"
              variant="standard"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="ex) 충남 천안시 동남구"
            />
            <AddFoodList_Input
              id="standard-basic"
              label="해시태그"
              variant="standard"
              name="hash"
              value={formData.hash}
              onChange={handleChange}
              placeholder="ex) #힐링 #카페 #디저트"
            />
            <AddFoodList_Input
              id="standard-basic"
              label="링크"
              variant="standard"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="ex) www.naver.com"
            />
            <AddFoodList_Button onClick={createData}>추가</AddFoodList_Button>
          </FlexBox>
        </AddFoodList_ModalBox>
      </Modal>
    </>
  );
};

export default AddPlayGround;
