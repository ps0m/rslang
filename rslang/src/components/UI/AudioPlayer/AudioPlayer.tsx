import { FC, ReactNode, useState } from "react";
import Button from "../Button/Button";
import { ReactComponent as IconPause } from "./assets/pauseCircle.svg";
import { ReactComponent as IconPlay } from "./assets/playCircle.svg";
import styles from "./AudioPlayer.module.scss";

interface IAudioPlayer {
  path: string
  className?: string
  children?: ReactNode
}

const AudioPlayer: FC<IAudioPlayer> = ({ path, className, children }) => {
  const [isPlay, setIsPlay] = useState<boolean>(false)

  const playAudio = () => {
    const player = new Audio(path);

    player.play()
    setIsPlay(!isPlay);

    player.addEventListener('ended', () => {
      setIsPlay(false)
    })
  }

  return (
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
      {children}
    </Button>
  );
};

export default AudioPlayer;