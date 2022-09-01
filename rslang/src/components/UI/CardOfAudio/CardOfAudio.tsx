import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { default as soundError } from '../../../assets/audio/error.mp3';
import { default as soundSuccess } from '../../../assets/audio/success.mp3';
import { URL_BASE } from '../../../constants/constatnts';
import { IContentForAudio, ICustomStat, IWords } from '../../../types/types';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Button from '../Button/Button';
import VolumeChange from '../VolumeChange/VolumeChange';
import styles from './CardOfAudio.module.scss';


interface IPropsCardOfAudio {
  content: IContentForAudio | null
  getResult: (newItem: ICustomStat) => void
  setMistakes: Dispatch<SetStateAction<number>>
}

const CardOfAudio: FC<IPropsCardOfAudio> = ({ content, getResult, setMistakes }) => {
  const [isVolume, setIsVolume] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [isSayWord, setIsSayWord] = useState<boolean>(false);

  const checkAnswer = (numberSelectWord: IWords | undefined) => {

    if (content !== null &&
      numberSelectWord !== undefined) {
      const resultGame = content.wordStudy.id === numberSelectWord.id

      setIsWin(resultGame);

      setTimeout(() => {
        getResult({
          word: content.wordStudy,
          isRight: resultGame,
          index: content.currentIndex
        })
        setIsWin(null)
        if (!resultGame) {
          setMistakes(prevMistakes => prevMistakes + 1)
        }
      }, 1000)
    }
  }

  const keyListener = (event: KeyboardEventInit) => {
    console.log(event.code);

    switch (event.code) {
      case 'Digit1': checkAnswer(content?.extraWords[0])
        break;
      case 'Digit2': checkAnswer(content?.extraWords[1])
        break;
      case 'Digit3': checkAnswer(content?.extraWords[2])
        break;
      case 'Digit4': checkAnswer(content?.extraWords[3])
        break;
      case 'Digit5': checkAnswer(content?.extraWords[4])
        break;
      case 'Space': {
        setIsSayWord(true)
      }

        break;
      default:
        return;
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', keyListener);
    if (content !== null) {
      console.log(2);

      setIsSayWord(true)
    }

    return () => {
      document.removeEventListener('keyup', keyListener);
    }
  }, [content])

  useEffect(() => {
    switch (isWin) {
      case false:
        playSound(false);

        break;
      case true:
        playSound(true);

        break;
      default:
        break;
    }
  }, [isWin])

  const playSound = (flag: boolean) => {
    if (!isVolume) {
      return
    }
    const path = flag
      ? soundSuccess
      : soundError

    const audio = new Audio(path)

    audio.play();
  }

  return (
    <div className={styles.card}>

      <div className={[styles.card__block_image,
      isWin !== null ? styles.card__block_image_active : ''].join(' ')}>

        {isWin === null
          ? <div className={styles.card__image_background}></div>
          : ''}

        {content !== null
          ? <img
            src={`${URL_BASE}/${content.wordStudy.image}`}
            alt={content?.wordStudy.word}
            className={styles.card__image}
          />
          : ''}

      </div>
      <div className={styles.card__body}>
        <div className={styles.card__volume_background}>
          <VolumeChange
            disabled={isWin !== null}
            active={isVolume}
            action={() => setIsVolume(!isVolume)}
            className={styles.card__volume} />
        </div>

        <AudioPlayer
          // disabled={isWin !== null}
          playOfParent={isSayWord}
          path={`${URL_BASE}/${content?.wordStudy.audio}`}
          className={styles.card__audioPlayer}
          resetPlayOfParent={() => { setIsSayWord(false) }
          }
        >
        </AudioPlayer>

      </div >

      <div className={styles.card__container_buttons}>
        {
          content !== null
            ? content.extraWords.map((word, index) => {
              return <Button
                disabled={isWin !== null}
                key={word.id}
                className={[styles.card__buttons,
                (content.wordStudy.id === word.id && isWin !== null)
                  ? styles.card__buttons_win
                  : 'styles.card__buttons_lose'
                ].join(' ')}
                onClick={() => checkAnswer(word)}
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