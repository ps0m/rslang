import { FC, useEffect, useState } from 'react';
import { default as soundError } from '../../../assets/audio/error.mp3';
import { default as soundSuccess } from '../../../assets/audio/success.mp3';
import { URL_BASE } from '../../../constants/constatnts';
import { IContentForCard, ICustomStat, IScore } from '../../../types/types';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Button from '../Button/Button';
import Timer from '../Timer/Timer';
import { ReactComponent as VolumeOff } from "./assets/volume_off.svg";
import { ReactComponent as VolumeOn } from "./assets/volume_on.svg";
import styles from './CardOfSprint.module.scss';



interface IPropsCardOfSprint {
  content: IContentForCard | null
  score: IScore
  setIsFinishGame: (isFinish: boolean) => void
  getResult: (newItem: ICustomStat) => void
}

const CardOfSprint: FC<IPropsCardOfSprint> = ({ content, score, setIsFinishGame, getResult }) => {
  const [isVolume, setIsVolume] = useState<boolean>(false);
  const flagForProgressSection = Math.floor(score.rightAnswer / 4 + 1)
  const flagForProgress = flagForProgressSection < 4
    ? score.rightAnswer % 4
    : 3

  const checkAnswer = (answer: boolean) => {

    if (content !== null) {
      isVolume
        ? playSound(content.isEqual === answer)
        : ''
      getResult({
        word: content.word,
        isRight: content.isEqual === answer,
        index: content.currentIndex
      })
    }
  }

  const keyListener = (event: KeyboardEventInit) => {
    switch (event.key) {
      case 'ArrowLeft': checkAnswer(false)
        break;
      case 'ArrowRight': checkAnswer(true)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.removeEventListener('keyup', keyListener)
    document.addEventListener('keyup', keyListener, { once: true })
  }, [content])



  const playSound = (flag: boolean) => {
    const path = flag
      ? soundSuccess
      : soundError

    const audio = new Audio(path)

    audio.play();
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__body}>
        <div className={styles.card__timer} >
          <Timer
            setIsFinishGame={setIsFinishGame} />
        </div>
        <div className={styles.card__header}>

          <div className={styles.card__counter}>
            {score.amount}
          </div>

          <Button
            className={styles.card__volume}
            onClick={() => setIsVolume(!isVolume)}>
            {isVolume
              ? <VolumeOn />
              : <VolumeOff />
            }
          </Button>


          <div className={styles.progress}>
            <div className={[styles.progress__item, (flagForProgress > 0) ? styles.progress__item_done : ''].join(' ')}></div>
            <div className={[styles.progress__item, (flagForProgress > 1) ? styles.progress__item_done : ''].join(' ')}></div>
            <div className={[styles.progress__item, (flagForProgress > 2) ? styles.progress__item_done : ''].join(' ')}></div>
            {score.coefficient > 1
              ? <p className={styles.progress__notate} >
                {score.coefficient}0 очков за слово
              </p>
              : ''
            }

          </div>


          <AudioPlayer
            path={`${URL_BASE}/${content?.word.audio}`}
            className={styles.card__audioPlayer}
          />
        </div>

        <div className={styles.progress}>
          <div className={[styles.progress__item, styles.progress__item_big,
          (flagForProgressSection > 0) ? styles.progress__item_done : ''].join(' ')}></div>
          <div className={[styles.progress__item, styles.progress__item_big,
          (flagForProgressSection > 1) ? styles.progress__item_done : ''].join(' ')}></div>
          <div className={[styles.progress__item, styles.progress__item_big,
          (flagForProgressSection > 2) ? styles.progress__item_done : ''].join(' ')}></div>
          <div className={[styles.progress__item, styles.progress__item_big,
          (flagForProgressSection > 3) ? styles.progress__item_done : ''].join(' ')}></div>
        </div>

      </div >

      <div className={styles.card__block_title}>
        <div className={styles.card__title}>{content?.word.word}</div>
        <div className={styles.card__subtitle}>{content?.translate}</div>
      </div>
      <div className={styles.card__container_buttons}>
        <Button
          className={[styles.card__buttons, styles.card__buttons_lose].join(' ')}
          onClick={() => {
            document.removeEventListener('keyup', keyListener)
            checkAnswer(false)
          }
          }
        > Неверно
        </Button>
        <Button
          className={[styles.card__buttons, styles.card__buttons_right].join(' ')}
          onClick={() => {
            document.removeEventListener('keyup', keyListener);
            checkAnswer(true);
          }
          }
        >Верно
        </Button>
      </div>
    </div >
  );
};

export default CardOfSprint;