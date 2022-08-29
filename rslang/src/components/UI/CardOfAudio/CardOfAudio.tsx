import { FC, useEffect, useState } from 'react';
import { default as soundError } from '../../../assets/audio/error.mp3';
import { default as soundSuccess } from '../../../assets/audio/success.mp3';
import { URL_BASE } from '../../../constants/constatnts';
import { IContentForAudio, ICustomStat } from '../../../types/types';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Button from '../Button/Button';

import styles from './CardOfAudio.module.scss';


interface IPropsCardOfAudio {
  content: IContentForAudio | null
  setIsFinishGame: (isFinish: boolean) => void
  getResult: (newItem: ICustomStat) => void
}

const CardOfAudio: FC<IPropsCardOfAudio> = ({ content, setIsFinishGame, getResult }) => {
  const [isVolume, setIsVolume] = useState<boolean>(false);

  const checkAnswer = (numberSelectWord: string) => {

    if (content !== null) {
      isVolume
        ? playSound(content.wordStudy.id === numberSelectWord)
        : ''
      getResult({
        word: content.wordStudy,
        isRight: content.wordStudy.id === numberSelectWord,
        index: content.currentIndex
      })
    }
  }

  const keyListener = (event: KeyboardEventInit) => {
    console.log(event.code);

    switch (event.code) {
      case 'Digit1': checkAnswer('1')
        break;
      case 'Digit2': checkAnswer('2')
        break;
      case 'Digit3': checkAnswer('3')
        break;
      case 'Digit4': checkAnswer('4')
        break;
      case 'Digit5': checkAnswer('5')
        break;
      // case 'Space': checkAnswer('5')
      //   break;
      default:
        return;
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', keyListener)
    return () => {
      document.removeEventListener('keyup', keyListener);
    }
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
        </div>
        <div className={styles.card__header}>

          {/* <VolumeChange
            active={isVolume}
            action={() => setIsVolume(!isVolume)}
            className={styles.card__volume} /> */}

          <AudioPlayer
            path={`${URL_BASE}/${content?.wordStudy.audio}`}
            className={styles.card__audioPlayer}
          >
            {/* <div className={styles.card__audioPlayer_background}></div> */}
          </AudioPlayer>
        </div>

      </div >

      <div className={styles.card__container_buttons}>

        {
          content !== null
            ? content.extraWords.map((word, index) => {
              return <Button
                key={index}
                className={[styles.card__buttons].join(' ')}
                onClick={() => checkAnswer('1')}
              > {`${index + 1}. ${word.wordTranslate}`}
              </Button>
            })
            : ''
        }


      </div>
    </div >
  );
};

export default CardOfAudio;