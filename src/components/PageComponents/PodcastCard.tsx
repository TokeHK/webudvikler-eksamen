import React, { useRef, useState, useEffect } from "react";
import { type Podcast } from "./PodcastComponent";

type CardProps = {
  podcast: Podcast;
};

export default function PodcastCard({ podcast }: CardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);/* starter med at være null */
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const formatTime = (time: number): string => {
    if (isNaN(time) || time <= 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handlePlayPause = (): void => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = (): void => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);/* bruger mp3 fil til duration da API alle er "45" som ikke kan bruges til noget */
    }
  };

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = clickX / rect.width;
    const newTime = duration * fraction;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skip = (seconds: number): void => {
    if (!audioRef.current) return;
    const newTime = Math.min(
      Math.max(audioRef.current.currentTime + seconds, 0),
      duration
    );
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  return (
    <div className="podcast_card">
      <img
        src={`http://localhost:3001/assets/podcast/${podcast.thumbnail}`}
        alt={podcast.headline}
      />
      <div className="podcast_info">
        <div>
          <h3>{podcast.headline}</h3>
          <p>{podcast.info}</p>
        </div>

        <div className="podcast_controls">
          <button onClick={() => skip(-10)}>&lt;</button>
          <button onClick={handlePlayPause} className="podcast-btn_border">
            {isPlaying ? "X" : "▶"}
          </button>
          <button onClick={() => skip(10)}>&gt;</button>
        </div>

        <div>
          <div className="podcast_time">
            <p>{formatTime(currentTime)}</p>
            <p>{formatTime(duration)}</p>
          </div>
          <audio ref={audioRef} src={`http://localhost:3001/assets/podcast/${podcast.podcast}`} preload="metadata" />
          <div className="podcast_bars-container" onClick={handleBarClick}>
            <div
              className="podcast_bars-fill"
              style={{
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
