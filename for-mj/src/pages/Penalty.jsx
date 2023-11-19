import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const Penalty = () => {
  // useRef를 사용하여 motion.div의 DOM 요소에 접근하는 참조 생성
  const slotItemRef = useRef(null);

  // 슬롯에 표시될 문자열을 담은 배열
  const arr = ["사과", "배", "포도", "복숭아", "바나나", "수박", "망고"];

  // 현재 보여지고 있는 슬롯의 인덱스를 나타내는 상태 변수
  const [currentIndex, setCurrentIndex] = useState(0);

  // 애니메이션이 완료될 때 호출되는 함수
  const onAnimationComplete = () => {
    // 다음 슬롯으로 이동하기 위해 currentIndex 업데이트
    // 배열 끝에 도달하면 처음으로 초기화
    setCurrentIndex((prev) => (prev + 1) % arr.length);
  };

  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: -40 },
    transition: { duration: 1, times: [0, 1] },
  };


    // 특정 키에 대한 transition 설정
    const transitionDuration = {
      duration: 0.5,
    };
  return (
    <>
      {/* 슬롯을 감싸는 스타일이 적용된 컨테이너 */}
      <StyledSlotBox>
        {/* AnimatePresence는 애니메이션을 처리하는 Framer Motion의 기능 */}
        <AnimatePresence>
          {/* 각 슬롯을 나타내는 motion.div */}
          <motion.div
            // 현재 슬롯의 인덱스를 키로 사용하여 애니메이션 처리
            key={currentIndex}
            ref={slotItemRef}
            // variants 설정
            initial="initial"
            variants={variants}
            // 애니메이션 정의
            animate="animate"
            // 애니메이션 지속 시간 및 타이밍 설정
            transition={variants.transition}
            // 애니메이션이 완료될 때 호출되는 함수 지정
            onAnimationComplete={onAnimationComplete}
          >
            {/* 현재 슬롯에 해당하는 문자열 출력 */}
            {arr[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </StyledSlotBox>
      {/* 멈추기 버튼, 클릭 이벤트 핸들러 추가 필요 */}
      <button>멈춰</button>
    </>
  );
};

// 슬롯을 감싸는 스타일이 적용된 컨테이너 스타일링
const StyledSlotBox = styled.div`
  margin-top: 500px;
  width: 200px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid black;
`;

export default Penalty;
