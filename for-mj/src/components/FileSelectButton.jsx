import styled from "@emotion/styled";
import React from "react";
import { FlexBox } from "../styles/style";

const FileSelectButton = ({ onChange, fileName }) => {
  return (
    <>
      <FileSelectButton_Container>
        <FlexBox>
          <FileSelectButton_Label for="file">파일찾기</FileSelectButton_Label>
          <FileSelectButton_Input
            type="file"
            id="file"
            onChange={onChange}
          ></FileSelectButton_Input>
          <FileSelectButton_FileName>{fileName}</FileSelectButton_FileName>
        </FlexBox>
      </FileSelectButton_Container>
    </>
  );
};

export const FileSelectButton_Container = styled.div`
  align-self: self-start;
  margin-left: 25px;
`;
export const FileSelectButton_Label = styled.label`
  display: inline-block;
  background-color: #ECE3CE;
  padding: 5px;
  border-radius: 10px;
  color: #739072;
  font-size: 12px;
  font-weight: bold;
  &:hover {
    background-color: #ECE3CE;
    opacity: 0.9;
  }
  margin-bottom: 5px;
`;
export const FileSelectButton_Input = styled.input`
  display: none;
`;

export const FileSelectButton_FileName = styled.div`
  margin-left:10px;
  font-size:12px;
`;

export default FileSelectButton;
