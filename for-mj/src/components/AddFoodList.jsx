import React from "react";
import { useState } from "react";
import { db, storage } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Modal from "@mui/material/Modal";
import {
  FlexBox,
  AddFoodList_Input,
  AddFoodList_ModalBox,
  AddFoodList_Button,
  AddFoodList_ModalButton,
} from "../styles/style";
import FileSelectButton from "./FileSelectButton";

const AddFoodList = () => {
  ////////////////////////////////////////////////// 변수 About FireStore
  //////////////////// DB에 업로드할 데이터
  const [formData, setFormData] = useState({
    category1: "",
    name: "",
    descript: "",
  });

  ////////////////////////////////////////////////// 함수 About FireStore
  //////////////////// DB에 업로드할 데이터 감지
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 현재 입력 필드의 name과 value를 가져옵니다.
    setFormData({
      ...formData,
      [name]: value, // 해당 필드의 값을 업데이트합니다.
    });
  };

  //////////////////// DB, storage에 데이터 추가 함수
  const createData = async () => {
    try {
      // db라는 상수에 담은 firesre에 접근하여 FoodList 컬렉션에 문서를 추가한다.
      // 문서명은 랜덤이며 문서에 들어갈 데이터는 중괄호 내부 내용과 같다
      const docRef = await addDoc(collection(db, "FoodList"), {
        category1: formData.category1,
        name: formData.name,
        descript: formData.descript,
        src: storageUploadImg.name,
        timestamp: new Date(),
      });
      // 인풋폼 비우기
      setFormData({
        category1: "",
        name: "",
        descript: "",
      });
      // 이미지 업로드
      imageUploadOnStorage();
      // 작업 성공 시 문서의 id 즉, 문서명을 콘솔 출력한다
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  ////////////////////////////////////////////////// 변수 About Storage
  //////////////////// storage에 업로드할 이미지 데이터
  const [storageUploadImg, setStorageUploadImg] = useState("");
  //////////////////// storage 하위 이미지 폴더 참조
  const storageRef = ref(storage, `FoodListImages/${storageUploadImg.name}`); // 이미지를 저장할 때에는 업로드하는 이미지의 파일명을 경로로 추가하여 image 폴더 하위에 파일명으로 파일이 저장되도록한다.

  ////////////////////////////////////////////////// 함수 About Storage
  ////////////////////이미지 업로드 함수
  const imageUploadOnStorage = () => {
    uploadBytes(storageRef, storageUploadImg).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  ////////////////////////////////////////////////// 변수 About 모달
  //////////////////// 모달 창 열기&닫기 state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  ////////////////////////////////////////////////// 렌더링 //////////////////////////////////////////////////
  return (
    <>
      {/* 클릭 전 보여줄 내용 작성(클릭 시 open state를 true로 변경하여 모달 창을 연다) */}
      <FlexBox style={{ justifyContent: "center" }}>
        <AddFoodList_ModalButton onClick={handleOpen}>
          데이터 추가하기
        </AddFoodList_ModalButton>
      </FlexBox>{" "}
      <Modal open={open} onClose={handleClose}>
        <AddFoodList_ModalBox>
          <FlexBox style={{ flexDirection: "column" }}>
            <AddFoodList_Input
              id="standard-basic"
              label="카테고리1"
              variant="standard"
              name="category1"
              value={formData.category1}
              onChange={handleChange}
              placeholder="ex) 한식, 중식, 일식, 양식, 분식, 간식"
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
            <FileSelectButton
              fileName={storageUploadImg.name}
              onChange={(e) => {
                setStorageUploadImg(e.target.files[0]);
              }}
            />
            <AddFoodList_Button onClick={createData}>추가</AddFoodList_Button>
          </FlexBox>
        </AddFoodList_ModalBox>
      </Modal>
    </>
  );
};

export default AddFoodList;
