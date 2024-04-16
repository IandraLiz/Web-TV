'use client'

import { createContext, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import videos, { Video } from "../data/video";

type HomeContextData = {
    videoURL: string;
    playing: boolean;
    totalTime: number;
    currentTime: number;
    volume: number;
    videoRef: RefObject<HTMLVideoElement>;
    playPause: () => void;
    volumeMute: () => void;
    changeVolume: (volume: number) => void;
    configCurrentTime: (time: number) => void;
    configVideo: (index: number) => void;
    setVolume: (volume: number) => void;
    toggleFullScreen: () => void;
    unMute: () => void;
    playNextVideo: () => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({ children }: ProviderProps) => {
    const [videoURL, setVideoURL] = useState("");
    const [videoIndex, setVideoIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        configVideo(videoIndex);
    }, []);

    const configVideo = (index: number) => {
        const currentIndex = index % videos.length;
        const currentVideo: Video = videos[currentIndex];
        const currentVideoURL = currentVideo.videoURL;
        setVideoURL(currentVideoURL);
        setVideoIndex(currentIndex);
    }

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.onloadedmetadata = () => {
                setTotalTime(video.duration);
                setCurrentTime(video.currentTime);
    
                if (playing) {
                    video.play();
                }
            }

            video.ontimeupdate = () => {
                const video = videoRef.current;
                if (!video) return;
                setCurrentTime(video.currentTime);
            }
    
            video.onended = () => {
                playNextVideo(); // Chama a função playNextVideo quando o vídeo atual termina
            }

            video.onvolumechange = () => {
                setVolume(video.volume);
            }
    
            const updateProgressBar = () => {
                if (video.duration) {
                    setCurrentTime(video.currentTime);
                }
            };
    
            video.addEventListener("timeupdate", updateProgressBar);
    
            return () => {
                video.removeEventListener("timeupdate", updateProgressBar);
            };
        }
    }, [videoURL]);
    
    const configCurrentTime = (time: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = time;
        setCurrentTime(time);
    }

    const playPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (playing) {
            video.pause();
        }
        else {
            video.play();
        }
        setPlaying(!playing);
    }

    const changeVolume = (newVolume: number) => {
        const video = videoRef.current;
        if (!video) return;
        
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        video.volume = clampedVolume;
        setVolume(clampedVolume);
    }

    const volumeMute = () => {
        const video = videoRef.current;
        if (!video) return;
    
        setMuted(!muted);
    
        if (muted) {
            setVolume(1);
            video.volume = 1;
        } else {
            setVolume(0);
            video.volume = 0;
        }
    }

    const toggleFullScreen = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.requestFullscreen) {
            video.requestFullscreen();
        }
    }

    const unMute = () => {
        const video = videoRef.current;
        if (!video) return;
    
        video.muted = false;
        setMuted(false);
    }

    const playNextVideo = () => {
        configVideo(videoIndex + 1);
    }

    return (
        <HomeContext.Provider value={
            {
                videoURL,
                playing,
                totalTime,
                currentTime,
                videoRef,
                volume,
                playPause,
                volumeMute,
                configCurrentTime,
                configVideo,
                changeVolume,
                setVolume,
                toggleFullScreen,
                unMute,
                playNextVideo
            }
        }>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
