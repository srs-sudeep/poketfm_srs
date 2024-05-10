import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPage = () => {
  // Sample video URLs
  const videoUrls = [
    'https://www.example.com/video1.mp4',
    'https://www.example.com/video2.mp4',
    // Add more video URLs here
  ];

  const [selectedVideo, setSelectedVideo] = useState(videoUrls[0]);

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-1/2">
        {/* React Player */}
        <ReactPlayer url={selectedVideo} controls width="100%" height="100%" />
      </div>
      <div className="w-1/2">
        {/* Video List */}
        <ul>
          {videoUrls.map((videoUrl, index) => (
            <li key={index}>
              <button onClick={() => handleVideoSelect(videoUrl)}>Video {index + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPage;
