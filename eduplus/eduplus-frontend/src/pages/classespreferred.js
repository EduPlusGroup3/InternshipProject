import React from 'react';
import VideoCard from './videocard';
import Vid1 from "../assests/videos/vid1.mp4";
import Vid2 from "../assests/videos/vid2.mp4";
import Vid3 from "../assests/videos/vid3.mp4";
import "../assests/styles/classespreferredstyles.css";

const ClassesPreferred = ({ onClose, username }) => {
  const videos = [
    {
      title: 'For age 6-8',
      description: 'Video for Kids aged 6-8',
      videoPath: Vid1,
      ageGroup: 'Kids',
    },
    {
      title: 'For age 9-14',
      description: 'Video for Kids aged 9-14',
      videoPath: Vid2,
      ageGroup: 'Teens',
    },
    {
      title: 'For age 14-17',
      description: 'Video for Kids aged 14-17',
      videoPath: Vid3,
      ageGroup: 'Teens',
    }  
  ];

  return (
    <div className="user-profile">
      <div className="profile-content">
        <h2>Classes Preferred</h2>
        <div className="videos-container">
          <div className="video-row">
            {videos.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPreferred;
