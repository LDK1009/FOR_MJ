import React from 'react';
import { HomeButton_Container, HomeButton_Image, HomeButton_Link, HomeButton_Text,} from '../styles/style';

const HomeButton = ({path, src, text}) => {
    return (
        <>
        <HomeButton_Link to={path}>
        <HomeButton_Container>
              <HomeButton_Image src={src} />
              <HomeButton_Text>{text}</HomeButton_Text>
        </HomeButton_Container>  
        </HomeButton_Link>
        </>
    );
};

export default HomeButton;