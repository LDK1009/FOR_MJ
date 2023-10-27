import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import Modal from "@mui/material/Modal";
import { FlexBox, AddFoodList_Input, AddFoodList_ModalBox, AddFoodList_Button } from "../styles/style";

const AddFoodList = () => {
  // 모달 창 열기&닫기 state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //인풋 입력값 감지 및 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 현재 입력 필드의 name과 value를 가져옵니다.

    setFormData({
      ...formData,
      [name]: value, // 해당 필드의 값을 업데이트합니다.
    });
  };

  // db에 추가할 폼 데이터
  const [formData, setFormData] = useState({
    category1: "",
    category2: "",
    name: "",
    descript: "",
  });

  //데이터 추가
  const createData = async () => {
    try {
      // db라는 상수에 담은 firesre에 접근하여 FoodList 컬렉션에 문서를 추가한다.
      // 문서명은 랜덤이며 문서에 들어갈 데이터는 중괄호 내부 내용과 같다
      const docRef = await addDoc(collection(db, "FoodList"), {
        category1: formData.category1,
        category2: formData.category2,
        name: formData.name,
        descript: formData.descript,
        timestamp: new Date(),
      });
      // 인풋폼 비우기      
      setFormData({
        category1: "",
        category2: "",
        name: "",
        descript: "",
      });
      // 작업 성공 시 문서의 id 즉, 문서명을 콘솔 출력한다
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      {/* 클릭 전 보여줄 내용 작성(클릭 시 open state를 true로 변경하여 모달 창을 연다) */}
      <button onClick={handleOpen}>데이터 추가하기</button>
      <Modal open={open} onClose={handleClose}>
        <AddFoodList_ModalBox>
          <FlexBox style={{flexDirection:'column'}}>
            <AddFoodList_Input
              id="standard-basic"
              label="카테고리1"
              variant="standard"
              name="category1"
              value={formData.category1}
              onChange={handleChange}
              placeholder="ex) 한식, 중식, 일식, 양식"
            />
            <AddFoodList_Input
              id="standard-basic"
              label="카테고리2"
              variant="standard"
              name="category2"
              value={formData.category2}
              onChange={handleChange}
              placeholder="ex) 국물, 볶음, 튀김"
            />
            <AddFoodList_Input
              id="standard-basic"
              label="메뉴 이름"
              variant="standard"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ex) 돈까스"
                          />
            <AddFoodList_Input
              id="standard-basic"
              label="메뉴 소개"
              variant="standard"
              name="descript"
              value={formData.descript}
              onChange={handleChange}
              placeholder="ex) 남자의 소울푸드 돈까스!"
              />
          <AddFoodList_Button onClick={createData}>추가</AddFoodList_Button>
          </FlexBox>
        </AddFoodList_ModalBox>
      </Modal>
    </>
  );
};

export default AddFoodList;
