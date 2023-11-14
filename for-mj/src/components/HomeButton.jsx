import React from 'react';
import { HomeButton_Container, HomeButton_Image, HomeButton_Text,} from '../styles/style';
import { useNavigate } from 'react-router-dom';

const HomeButton = ({path, src, text, navigateProps}) => {
    const navigate = useNavigate(); // 네비게이트 훅 
    return (
        <>
        <HomeButton_Container onClick={()=>navigate(path, { state : navigateProps })}>
              <HomeButton_Image src={src} />
              <HomeButton_Text>{text}</HomeButton_Text>
        </HomeButton_Container>  
        </>
    );
};

export default HomeButton;