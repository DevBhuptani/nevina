import {
  DiscAlbum,
  FileMusic,
  KeyboardMusic,
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Speaker,
  Volume2,
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import MusicAlbum from '../../assets/images/music-album.jpeg';
import Music from '../../assets/music/music.mp3';

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
      setCurrentTime(Number(event.target.value));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full fixed bottom-0 left-0 bg-gray-100 shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Album Info */}
      <div className="flex items-center gap-5 w-full sm:w-3/12">
        <div className="flex items-center">
          <img
            src={MusicAlbum}
            alt="Album cover"
            className="w-12 h-12 rounded-md"
          />
          <div className="ml-3">
            <p className="text-lg font-semibold text-gray-900">Kesariya</p>
            <p className="text-sm text-gray-600">Pritam</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-gray-900">
            <Shuffle />
          </button>
          <button className="text-gray-700 hover:text-gray-900">
            <SkipBack />
          </button>
          <button
            onClick={togglePlayPause}
            className="text-gray-700 hover:text-gray-900"
          >
            {isPlaying ? <Play /> : <Pause />}
          </button>
          <button className="text-gray-700 hover:text-gray-900">
            <SkipForward />
          </button>
          <button className="text-gray-700 hover:text-gray-900">
            <DiscAlbum />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center w-full sm:w-6/12 space-x-2 sm:space-x-4">
        <span className="text-sm text-gray-600">{formatTime(currentTime)}</span>

        <input
          type="range"
          className="w-full h-1 appearance-none bg-gray-300 rounded-full focus:outline-none"
          min="0"
          max={audioRef.current?.duration || 100}
          value={currentTime}
          onChange={handleSeek}
          style={{
            accentColor: 'black',
          }}
        />

        <span className="text-sm text-gray-600">
          {audioRef.current ? formatTime(audioRef.current.duration) : '00:00'}
        </span>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-gray-900">
            <KeyboardMusic />
          </button>
          <button className="text-gray-700 hover:text-gray-900">
            <FileMusic />
          </button>
          <button className="text-gray-700 hover:text-gray-900">
            <Speaker />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-gray-900">
            <Volume2 />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            className="w-full h-1 appearance-none bg-gray-300 rounded-full focus:outline-none"
            style={{
              accentColor: 'black',
            }}
          />
        </div>
      </div>

      <audio ref={audioRef} src={Music} onTimeUpdate={handleTimeUpdate} />
    </div>
  );
};

export default Footer;
