import React from 'react';
import { useLocation } from 'react-router-dom';

const Diary = () => {
    ////////////////////navigate로 받은 props
    const location = useLocation();
    console.log(location.state)
    return (
        <>
            {location.state}
            <button>일기 쓰기</button>
        </>
    );
};

export default Diary;