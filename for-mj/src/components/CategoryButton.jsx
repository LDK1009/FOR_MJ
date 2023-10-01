import React from 'react';
import { CategoryButton_Container, CategoryButton_Label, CategoryButton_image } from '../styles/style';


const CategoryButton = ({onClick, src, label}) => {
    return (
        <>
            <CategoryButton_Container onClick={onClick}>
                <CategoryButton_image src={src} alt=''/>
                <CategoryButton_Label>{label}</CategoryButton_Label>
            </CategoryButton_Container>
        </>
    );
};

export default CategoryButton;