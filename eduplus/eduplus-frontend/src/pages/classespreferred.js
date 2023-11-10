import React from "react";
import CardItem from "./carditem";
import "../assests/styles/cards.css";
import image2 from "../assests/images/image2.jpg";
import image3 from "../assests/images/image3.jpg";
import image4 from "../assests/images/image4.jpg";

const ClassesPreferred = ({ onClose, username }) => {
  return (
    <div className='cards'>
      <h1>Check out these Courses!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={image2}
              text='Robotics'
              label='10 yrs'
              path='/services'
            />
            <CardItem
              src={image2}
              text='Internet of Things'
              label='10 yrs'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={image2}
              text='Machine Learning'
              label='14 yrs'
              path='/services'
            />
            <CardItem
              src={image2}
              text='Java coding for kids!'
              label='13 yrs'
              path='/products'
            />
            <CardItem
              src={image2}
              text='Python for kids'
              label='13 yrs'
              path='/sign-up'
            />
            <CardItem
              src={image2}
              text='Python for kids'
              label='13 yrs'
              path='/sign-up'
            />
            <CardItem
              src={image2}
              text='Python for kids'
              label='13 yrs'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassesPreferred;
