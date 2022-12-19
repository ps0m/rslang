/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode, useEffect, useState } from "react";
import Button from "../Button/Button";
import { ReactComponent as IconPause } from "./assets/pauseCircle.svg";
import { ReactComponent as IconPlay } from "./assets/playCircle.svg";
import styles from "./AudioPlayer.module.scss";

interface IAudioPlayer {
  path: string
  playOfParent?: boolean
  resetPlayOfParent?: (() => void)
  className?: string
  children?: ReactNode
  disabled?: boolean
}

const AudioPlayer: FC<IAudioPlayer> = ({ path, className, children, disabled, playOfParent, resetPlayOfParent }) => {
  const [isPlay, setIsPlay] = useState<boolean>(false)

  const playAudio = () => {

    const player = new Audio(path);

    player.play()
    setIsPlay(!isPlay);

    player.addEventListener('ended', () => {
      setIsPlay(false)
      if (resetPlayOfParent) {
        resetPlayOfParent();
      }
    })

  }

  useEffect(() => {
    if (playOfParent) {
      playAudio();
    }

  }, [playOfParent])


  return (
    <Button
      disabled={disabled}
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