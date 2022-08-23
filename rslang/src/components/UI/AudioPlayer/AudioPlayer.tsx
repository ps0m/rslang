import { FC, useState } from "react";
import Button from "../Button/Button";
import { ReactComponent as IconPause } from "./assets/pauseCircle.svg";
import { ReactComponent as IconPlay } from "./assets/playCircle.svg";
import styles from "./AudioPlayer.module.scss";

interface IAudioPlayer {
  path: string
  className?: string
}

const AudioPlayer: FC<IAudioPlayer> = ({ path, className }) => {
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const player = new Audio(path);

  player.preload = 'metadata';
  player.addEventListener('ended', () => {
    setIsPlay(false)
  })

  const playAudio = () => {
    player.play()
    setIsPlay(!isPlay);
  }

  return (
    <div>
      <Button
        className={className}
        onClick={() => {
          if (!isPlay) {
            playAudio()
          }
        }
        }
      >
        {isPlay
          ? <IconPause className={styles.audioPlayer} />
          : <IconPlay className={styles.audioPlayer} />
        }
      </Button>
    </div>
  );
};

export default AudioPlayer;