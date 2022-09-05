import { FC, useContext, useState } from "react";
import { URL_BASE } from "../../../constants/constatnts";
import { MyContext } from "../../../context/context";
import { IDifficulty, IOptionalProgress, IPropertyWord, IWords } from "../../../types/types";
import { updateUserWord } from "../../API/API";
import AudioPlayer from "../../UI/AudioPlayer/AudioPlayer";
import Button from "../../UI/Button/Button";
import { ReactComponent as IconHeart } from "./assets/heart.svg";
import { ReactComponent as IconDifficult } from "./assets/icon_difficult.svg";
import { ReactComponent as IconLearned } from "./assets/icon_learned.svg";
import styles from "./CardOfWord.module.scss";


interface ICard {
  word: IWords,
  learned: boolean,
  difficult: boolean
  progress: IOptionalProgress
  styleColor: string,
}

const Card: FC<ICard> = ({ word, learned, difficult, progress, styleColor }) => {
  const [isLearned, setIsLearned] = useState<boolean>(learned)
  const [isDifficult, setIsDifficult] = useState<boolean>(difficult)

  const { isAuth } = useContext(MyContext)

  function createMarkup(value: string) {
    return { __html: value };
  }

  const updateWord = async (flag: keyof ICard) => {
    if (!isAuth) {
      return
    }
    let newLearned: boolean;
    let newDifficult: IDifficulty;

    if (flag === 'learned' && !isLearned) {
      newLearned = true;
      newDifficult = IDifficulty.easy
    } else
      if (flag === 'learned' && isLearned) {
        newLearned = false;
        newDifficult = isDifficult ? IDifficulty.hard : IDifficulty.easy
      } else

        if (flag === 'difficult' && !isDifficult) {
          newLearned = false;
          newDifficult = IDifficulty.hard
        } else {
          newLearned = isLearned;
          newDifficult = IDifficulty.easy;
        }



    const propertyWord: IPropertyWord = {
      difficulty: newDifficult,
      optional: {
        id: word.id,
        isNew: false,
        learned: newLearned,
        progress: progress,
      }
    }


    await updateUserWord(isAuth.userId, word.id, propertyWord, isAuth.token);

    setIsDifficult(newDifficult === IDifficulty.hard)
    setIsLearned(newLearned)
  }

  return (
    <div style={{ backgroundColor: styleColor }} className={styles.card}>
      <div className={styles.card__block_image}>
        <img className={styles.card__image} src={`${URL_BASE}/${word.image}`} alt={word.word} />
      </div>
      <div className={styles.card__block_text}>
        <div className={styles.card__block_title}>
          <div className={styles.card__container_section_one}>
            {isAuth
              ? <div className={styles.card__buttons}>
                <Button
                  title='Изученное слово'
                  onClick={(e) => {
                    e.preventDefault();
                    updateWord('learned')
                  }}
                >
                  <IconLearned className={
                    isLearned
                      ? styles.card__icon_active
                      : styles.card__icon
                  }
                  />
                </Button>

                <div
                  className={styles.progress}
                  title='Прогресс изучения' >
                  {Array(5).fill('').map((item, index) => {
                    return (<div key={index}>
                      <IconHeart
                        className={[styles.progress__icon,
                        progress[index] === true ? styles.progress__icon_win :
                          progress[index] === false ? styles.progress__icon_lose : ''
                        ].join(' ')} />
                    </div>)

                  })
                  }
                </div>

                <Button
                  title='Сложное слово'
                  onClick={(e) => {
                    e.preventDefault();
                    updateWord('difficult')
                  }} >
                  <IconDifficult
                    className={
                      isDifficult
                        ? styles.card__icon_active
                        : styles.card__icon
                    } />
                </Button>
              </div>
              : ''
            }
          </div>
          <div className={styles.card__container_section_two}>
            <div className={styles.card__container_buttons}>
              <AudioPlayer
                path={`${URL_BASE}/${word.audio}`}
                className={styles.card__audioPlayer_big}
              />
            </div>

            <div>
              <div className={styles.card__title}>{word.word}</div>
              <div className={styles.card__subtitle}>{word.transcription}</div>
              <div className={styles.card__subtitle}>{word.wordTranslate}</div>
            </div>
          </div>
        </div>
        <div className={styles.card__subblock}>
          <AudioPlayer
            path={`${URL_BASE}/${word.audioExample}`}
            className={styles.card__audioPlayer}
          />
          <div className={styles.card__text}>
            <div dangerouslySetInnerHTML={createMarkup(word.textExample)} />
            <div>{word.textExampleTranslate}</div>
          </div>
        </div>
        <div className={styles.card__subblock}>
          <AudioPlayer
            path={`${URL_BASE}/${word.audioMeaning}`}
            className={styles.card__audioPlayer}
          />
          <div className={styles.card__text}>
            <div dangerouslySetInnerHTML={createMarkup(word.textMeaning)} />
            <div>{word.textMeaningTranslate}</div>
          </div>
        </div>


      </div>

    </div>
  );
};

export default Card;