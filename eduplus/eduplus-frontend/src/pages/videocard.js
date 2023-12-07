// VideoCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "../assests/styles/classespreferredstyles.css";

const VideoCard = ({ title, description, videoPath, ageGroup }) => {
  return (
    <Card>
      <CardMedia
        component="video"
        controls
        height="140"
        src={videoPath} // Path to your local video file
        title={title}
      />
      <CardContent>
        <Typography variant="h6" color="rgb(170,8,42)">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age Group: {ageGroup}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
