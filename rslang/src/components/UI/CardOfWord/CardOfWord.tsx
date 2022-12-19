import { FC, useContext, useState } from "react";
import { URL_BASE } from "../../../constants/constants";
import { MyContext } from "../../../context/context";
import { getCurrentDate, initialStatistic } from "../../../helpers/helpers";
import { IDifficulty, IFullWordsForBook, IOptionalProgress, IPropertyWord, IStatistic, IWords } from "../../../types/types";
import { getUserStatistics, updateUserStatistics, updateUserWord } from "../../API/API";
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
  handlerCurrentState: (updatedWord: IFullWordsForBook) => void
}

const Card: FC<ICard> = ({ word, learned, difficult, progress, styleColor, handlerCurrentState }) => {
  const [isLearned, setIsLearned] = useState<boolean>(learned)
  const [isDifficult, setIsDifficult] = useState<boolean>(difficult)

  const { isAuth } = useContext(MyContext)

  function createMarkup(value: string) {
    return { __html: value };
  }

  const updateWord = async (flag: keyof ICard) => {
    try {

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

      const differenceLearned = !isLearned && newLearned ? 1
        : isLearned && !newLearned ? -1 : 0

      updateUserWord(isAuth.userId, word.id, propertyWord, isAuth.token);

      if (differenceLearned !== 0) {
        const oldStatistics: IStatistic = await getUserStatistics(isAuth.userId, isAuth.token);
        const currentDate = getCurrentDate();
        const lastStatDate = oldStatistics.optional.daily.date;


        const statOfLastStatDate: IStatistic = {
          learnedWords: 0,
          optional: {
            daily: {
              sprint: oldStatistics.optional.daily.sprint,
              audio: oldStatistics.optional.daily.audio,
              words: {
                ...oldStatistics.optional.daily.words,
                learnedWords: oldStatistics.optional.daily.words.learnedWords + differenceLearned
              },
              date: lastStatDate,
            },
            longTerm: {
              ...oldStatistics.optional.longTerm,
              [lastStatDate]: {
                newLearnedWords:
                  oldStatistics.optional.longTerm[lastStatDate].newLearnedWords,
                totalLearnedWords:
                  oldStatistics.optional.longTerm[lastStatDate].totalLearnedWords +
                  differenceLearned,
              },
            },
          },
        }

        // ...initialStatistic,
        const statOfCurrentDate: IStatistic = {
          learnedWords: 0,
          optional: {
            ...initialStatistic.optional,
            longTerm: {
              ...oldStatistics.optional.longTerm,
              [currentDate]: {
                newLearnedWords: 0,
                totalLearnedWords: oldStatistics.optional.longTerm[lastStatDate].totalLearnedWords + differenceLearned
              }
            }
          }
        }

        const resultStat = lastStatDate === currentDate ? statOfLastStatDate : statOfCurrentDate

        updateUserStatistics(isAuth.userId, resultStat, isAuth.token);
      }

      handlerCurrentState({ word: word, difficult: newDifficult, learned: newLearned, progress: progress })

      setIsDifficult(newDifficult === IDifficulty.hard)
      setIsLearned(newLearned);



    } catch (e: unknown) {
      if (typeof e === "string") {
        console.log(e);
      } else if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  return (
    <div
      style={{ backgroundColor: styleColor }}
      className={[styles.card,
      isDifficult ? styles.card_isDifficult : '',
      isLearned ? styles.card_isLearned : ''].join(' ')}>
      <div className={styles.card__block_image}>
        <img className={styles.card__image} src={`${URL_BASE}/${word.image}`} alt={word.word} />
      </div>
      <div className={styles.card__block_text}>
        <div className={styles.card__block_title}>
          <div className={styles.card__container_section_one}>
            {isAuth
              ? <div
                className={[styles.card__buttons,
                isDifficult ? styles.card__buttons_isDifficult : '',
                isLearned ? styles.card__buttons_isLearned : ''].join(' ')}>
                <Button
                  title='Изученное слово'
                  onClick={(e) => {
                    e.preventDefault();
                    updateWord('learned');

                  }}
                >
                  <IconLearned className={
                    isLearned
                      ? [styles.card__icon, styles.card__icon_isLearned].join(' ')
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
                        ? [styles.card__icon, styles.card__icon_isDifficult].join(' ')
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
