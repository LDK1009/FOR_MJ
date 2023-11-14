import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AddFoodList_Button, AddFoodList_ModalBox } from "../styles/style";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import FileSelectButton from "./FileSelectButton";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

const AddDiary = ({ diaryName }) => {
  //////////////////////////////////////////////////이벤트 감지//////////////////////////////////////////////////

  const [formData, setFormData] = useState({
    date: "",
    descript: "",
  });

  //////////////////// DB에 업로드할 데이터 감지
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 현재 입력 필드의 name과 value를 가져옵니다.
    setFormData({
      ...formData,
      [name]: value, // 해당 필드의 값을 업데이트합니다.
    });
  };

  //////////////////////////////////////////////////모달//////////////////////////////////////////////////
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  //////////////////////////////////////////////////파이어스토어//////////////////////////////////////////////////
  //////////////////// 데이터 추가 함수
  const createData = async () => {
    try {
      // db라는 상수에 담은 firesre에 접근하여 FoodList 컬렉션에 문서를 추가한다.
      // 문서명은 랜덤이며 문서에 들어갈 데이터는 중괄호 내부 내용과 같다
      const docRef = await addDoc(collection(db, "AllDiary"), {
        date: formData.date,
        descript: formData.descript,
        src: storageUploadImg.name,
        timestamp: new Date(),
        classification:diaryName,
      });

      // 인풋폼 비우기
      setFormData({
        date: " ",
        descript: " ",
      });
      setUploadImageName("");

      // 이미지 업로드
      imageUploadOnStorage();

      // 작업 성공 시 문서의 id 즉, 문서명을 콘솔 출력한다
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //////////////////////////////////////////////////스토리지//////////////////////////////////////////////////

  //////////////////// storage에 업로드할 이미지 데이터
  const [storageUploadImg, setStorageUploadImg] = useState("");

  const [uploadImageName, setUploadImageName] = useState("");
  useEffect(() => {
    setUploadImageName(()=>storageUploadImg.name);
  }, [storageUploadImg]);
  
  //////////////////// storage 하위 이미지 폴더 참조
  const storageRef = ref(storage, `DiaryImages/${storageUploadImg.name}`); // 이미지를 저장할 때에는 업로드하는 이미지의 파일명을 경로로 추가하여 image 폴더 하위에 파일명으로 파일이 저장되도록한다.

  ////////////////////////////////////////////////// 함수 About Storage
  ////////////////////이미지 업로드 함수
  const imageUploadOnStorage = () => {
    uploadBytes(storageRef, storageUploadImg).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  //////////////////////////////////////////////////렌더링//////////////////////////////////////////////////

  return (
    <div>
      <AddIcon_AddDiary onClick={handleModalOpen} />
      <Modal open={modalOpen} onClose={handleModalClose}>
        <ModalBox_AddDiary>
          <InputContainer_AddDiary>
            <Input_AddDiary
              id="standard-basic"
              label="날짜"
              variant="standard"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="ex) 2023.11.10"
            />
            <Input_AddDiary
              id="standard-basic"
              label="한 줄 일기"
              variant="standard"
              name="descript"
              value={formData.descript}
              onChange={handleChange}
              placeholder="ex) 따뜻한 우동 국물이어따😋"
            />
            <FileSelectButton
              fileName={uploadImageName}
              onChange={(e) => {
                setStorageUploadImg(e.target.files[0]);
              }}
            />
            <AddFoodList_Button onClick={createData}>추가</AddFoodList_Button>
          </InputContainer_AddDiary>
        </ModalBox_AddDiary>
      </Modal>
    </div>
  );
};
//////////////////////////////////////////////////스타일 컴포넌트//////////////////////////////////////////////////

export const AddIcon_AddDiary = styled(AddIcon)`
  font-size: 40px;
  color: #625b5b;
  background-color: #bcd2a1;
  border-radius: 100%;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const ModalBox_AddDiary = styled(AddFoodList_ModalBox)`
  background-color: #f5e2c8;
  border: 0px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
`;

export const InputContainer_AddDiary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input_AddDiary = styled(TextField)`
  background-color: #f5e2c8;
  margin-bottom: 15px;
`;

export default AddDiary;
