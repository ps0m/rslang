import { FC, useContext } from "react";
import { URL_BASE } from "../../../constants/constatnts";
import { MyContext } from "../../../context/context";
import { IWords } from "../../../types/types";
import AudioPlayer from "../../UI/AudioPlayer/AudioPlayer";
import Button from "../../UI/Button/Button";
import { ReactComponent as IconDifficult } from "./assets/icon_difficult.svg";
import { ReactComponent as IconLearned } from "./assets/icon_learned.svg";
import styles from "./CardOfWord.module.scss";


interface ICard {
  word: IWords,
  learned: boolean,
  difficult: boolean
}

const Card: FC<ICard> = ({ word, learned, difficult }) => {

  const { isAuth } = useContext(MyContext)

  function createMarkup(value: string) {
    return { __html: value };
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__block_image}>
        <img className={styles.card__image} src={`${URL_BASE}/${word.image}`} alt={word.word} />
      </div>
      <div className={styles.card__block_text}>
        <div className={styles.card__block_title}>
          <div className={styles.card__container_buttons}>
            {isAuth
              ? <div className={styles.card__buttons}>
                <Button
                  onClick={() => ''}
                >
                  <IconLearned className={
                    learned
                      ? styles.card__icon_active
                      : styles.card__icon
                  }
                  />
                </Button>
                <Button
                  onClick={() => ''} >
                  <IconDifficult className={
                    difficult
                      ? styles.card__icon_active
                      : styles.card__icon
                  } />
                </Button>
              </div>
              : ''
            }

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
        <div className={styles.card__subblock}>
          <AudioPlayer
            path={`${URL_BASE}/${word.audioExample}`}
            className={styles.card__audioPlayer}
          />
          <div>
            <div dangerouslySetInnerHTML={createMarkup(word.textExample)} />
            <div>{word.textExampleTranslate}</div>
          </div>
        </div>
        <div className={styles.card__subblock}>
          <AudioPlayer
            path={`${URL_BASE}/${word.audioMeaning}`}
            className={styles.card__audioPlayer}
          />
          <div>
            <div dangerouslySetInnerHTML={createMarkup(word.textMeaning)} />
            <div>{word.textMeaningTranslate}</div>
          </div>
        </div>


      </div>

    </div>
  );
};

export default Card;