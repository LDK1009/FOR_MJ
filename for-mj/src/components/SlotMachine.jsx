import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const SlotMachine = () => {
  // useRef를 사용하여 motion.div의 DOM 요소에 접근하는 참조 생성
  const slotItemRef = useRef(null);

  // 슬롯에 표시될 문자열을 담은 배열
  const arr = ['귀엽게 춤추기', '동물 모방하기', '존댓말 쓰기', '말 끝마다 \'냥\' 붙이기', '정해진 글자 수로만 말하기', '소원 들어주기', '흥미로운 썰 풀기','상대방이 원하는 호칭으로 불러주기', '성대모사 하기', '딱밤', 'ASMR 3행시', '눈알로 이름 쓰기', '귀엽게 셀카 찍기', '이빨 보이지 않고 말하기', '실수하면 \'잇힝\' 하기', '걸을 때 마다 \'콩!\' 소리 내기 ', '행동 마다 효과음 붙이기', '거울 보고 볼 찌르기'];

  // 현재 보여지고 있는 슬롯의 인덱스를 나타내는 상태 변수
  const [currentIndex, setCurrentIndex] = useState(0);

  // 애니메이션이 완료되면  호출되는 함수
  const onAnimationComplete = () => {
    // 다음 슬롯으로 이동하기 위해 currentIndex 업데이트
    setCurrentIndex((prev) => (prev + 1) % arr.length);
    setCurrentColor(() => randomColors[currentIndex]);
  };

  // Framer motion 애니메이션에 필요한 속성값 객체
  const [slotVariants, setSlotVariants] = useState({
    initial: { opacity: 1, y: 40 }, // 텍스트는 밑에서 시작해서
    animate: { opacity: 0.7, y: -40 }, // 위로 올라온다
    transition: { duration: 0.1, times: [0, 1] }, // initial 상태에서 animate 상태까지 도달하는 데에 걸리는 시간은 duration
  });

  // 슬롯 멈추기 함수
  const slotStop = () => {
    changeSlotSpeed(0, 0.2); // 속도 줄이기 1
    changeSlotSpeed(1, 0.5); // 속도 줄이기 1
    changeSlotSpeed(3000, 1); // 속도 줄이기 2
    changeSlotSpeed(5000, 2); // 속도 줄이기 3
    setTimeout(() => {
      setSlotVariants(() => ({})); // 슬롯 멈추기(애니메이션 속성 객체를 모두 초기화 시켜 슬롯을 멈춘다.)
    }, 9200);
  };

  // 슬롯 머신 속도 변화 함수
  const changeSlotSpeed = (delay, speed) => {
    setTimeout(() => {
      setSlotVariants((prev) => ({
        ...prev,
        transition: { duration: speed, times: [0, 1] },
      }));
    }, delay);
  };

  function getRandomHex() {
    // 랜덤으로 0부터 255까지의 값을 생성하고 16진수로 변환하여 반환
    return Math.floor(Math.random() * 256);
    // return Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  }

  function generateRandomColor() {
    // 빨강, 초록, 파랑 채널의 색상 코드를 생성
    const red = getRandomHex();
    const green = getRandomHex();
    const blue = getRandomHex();

    // 전체 색상 코드를 조합하고 반환
    return `rgba(${red}, ${green}, ${blue}, 0.6)`;
  }

  // 100개의 랜덤 색상 코드 생성
  const randomColors = Array.from({ length: 100 }, generateRandomColor);
  const [currentColor, setCurrentColor] = useState("");
  return (
    <>
      <Container backgroundColor={currentColor}>
        {/* 슬롯 컨테이너 */}
        <SlotContainer>
          {/* 애니메이션의 등장,퇴장 감지 / onAnimationComplete을 사용하려면 필요함 */}
          <AnimatePresence>
            {/* 애니메이션 박스 */}
            <motion.div
              key={currentIndex} // 현재 슬롯의 인덱스를 키로 사용하여 애니메이션 처리
              ref={slotItemRef}
              variants={slotVariants}
              initial={slotVariants.initial}
              animate={slotVariants.animate}
              transition={slotVariants.transition}
              // 애니메이션이 완료될 때 호출되는 함수 지정
              onAnimationComplete={onAnimationComplete}
            >
              {/* 슬롯 아이템 보이는 곳 */}
              <SlotItemBox>{arr[currentIndex]}</SlotItemBox>
            </motion.div>
          </AnimatePresence>
        </SlotContainer>
        {/* 멈추기 버튼, 클릭 이벤트 핸들러 추가 필요 */}
        <StopButton onClick={slotStop}>멈춰</StopButton>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 420px;
  height: 820px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
`;

// 슬롯을 감싸는 스타일이 적용된 컨테이너 스타일링
const SlotContainer = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
  `;

const SlotItemBox = styled.div`
  /* color: white; */
  width: 300px;
  height: 100px;
  text-align:center;
  font-size: 30px;
  font-weight: bold;
  overflow-wrap: break-word;
`;

const StopButton = styled.button`
  border-radius: 10px;
  border: 0px;
  background-color: #bcd2a1;
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 150px;
  padding:10px;
  &:hover {
    background-color: #bcd2a1;
    opacity: 0.9;
  }
`;

export default SlotMachine;
