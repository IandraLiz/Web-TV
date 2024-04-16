'use client'

import React, { useContext, useState } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPause, FaPlay, FaVolumeUp, FaVolumeMute, FaExpand, FaForward, FaBackward } from "react-icons/fa";
import videos, { Video } from './data/video';
import { MdDescription } from "react-icons/md";

export default function Home() {
  const {
    videoURL,
    playing,
    totalTime,
    currentTime,
    videoRef,
    playPause,
    configCurrentTime,
    configVideo,
    volume,
    setVolume,
    changeVolume,
    volumeMute,
    toggleFullScreen,
    unMute,
    playNextVideo
  } = useContext(HomeContext);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleVolumeChange = (e: { target: { value: string; }; }) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume); 
  };

  const handleVideoSelection = (index: number) => {
    setSelectedVideo(videos[index]);
    configVideo(index);
  };

  const handlePlayNextVideo = () => {
    const nextIndex = (videos.findIndex(video => video === selectedVideo) + 1) % videos.length;
    setSelectedVideo(videos[nextIndex]);
    configVideo(nextIndex);
  };

  const handlePlayPreviousVideo = () => {
    const previousIndex = (videos.findIndex(video => video === selectedVideo) - 1 + videos.length) % videos.length;
    setSelectedVideo(videos[previousIndex]);
    configVideo(previousIndex);
  };

  return (
    <main className="mx-auto w-[80%] mt-2 flex">
      <div className="w-[65%] mr-1" >
      {selectedVideo && (
        <h1 style={{fontSize: '24px'}}>{selectedVideo.description}</h1>
      )}
        <video className="w-full" ref={videoRef} src={videoURL}></video>
        <div className="bg-black flex flex items-center space-x-2 px-2">
          <input
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onChange={(e) => configCurrentTime(Number(e.target.value))}
            className="flex-grow video-progress mt-2"
          />
        </div>
        <div className="bg-black flex flex justify-between px-2">
          <button className="text-white" onClick={playPause}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <span className="text-white mx-2">{formatTime(currentTime)}</span> {/* Exibe o tempo atual formatado */}
          <button className="text-white" onClick={handlePlayPreviousVideo}> {/* Voltar para o vídeo anterior */}
            <FaBackward />
          </button>
          <button className="text-white" onClick={handlePlayNextVideo}> {/* Avançar para o vídeo seguinte */}
            <FaForward />
          </button>
          <button className="text-white mx-2" onClick={volumeMute}>
            {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>          
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => {
              const newVolume = Number(e.target.value);
              changeVolume(newVolume);
              if (newVolume === 0) {
                volumeMute();
              }
              else{
                unMute();
              }
            }}
          />  
          <button className="text-white ml-auto" onClick={toggleFullScreen}>
            <FaExpand />
          </button>
        </div>
        {selectedVideo && (
          <div style={{ marginTop: '20px' }}>
            <p><MdDescription /> Sinopse: {selectedVideo.sinopse}</p>
          </div>
        )}
      </div>
      <div className="w-[35%] h-[100vh]">
        {videos.map((video: Video, index) => (
          <button className="w-full" onClick={() => handleVideoSelection(index)}>
            <h2>{video.description}</h2>
            <img key={index} className="w-full h-[200px] mb-1" src={video.imageURL} alt={video.description} />
          </button>
        ))}
      </div>
      <style jsx>{`
          input[type="range"]::-webkit-slider-runnable-track {
            background: linear-gradient(to right, #00a8ff ${volume * 100}%, #ccc ${volume * 100}%);
          }
          input.video-progress::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #00a8ff ${currentTime / totalTime * 100}%, #ccc ${currentTime / totalTime * 100}%);
        }
      `}</style>
    </main>
  );
}
