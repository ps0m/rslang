import { FC } from "react";
import { MAX_MISTAKES_OF_AUDIO_GAMES } from "../../../constants/constatnts";
import { ReactComponent as IconHeart } from "./assets/heart.svg";
import styles from './Progress.module.scss';

interface IPropsProgress {
  amountMistakes: number
  className?: string
}

const Progress: FC<IPropsProgress> = ({ amountMistakes, className }) => {

  return (
    <div className={[styles.progress, className].join(' ')}>
      {Array(MAX_MISTAKES_OF_AUDIO_GAMES).fill('').map((item, index) => {
        return (<div key={index}>
          <IconHeart
            className={[styles.progress__icon,
            amountMistakes >= MAX_MISTAKES_OF_AUDIO_GAMES - index ? styles.progress__icon_mistake : ''].join(' ')} />
        </div>)

      })
      }
    </div>
  );
};

export default Progress;