import { IDifficulty, IFullWordsForBook } from "../../../types/types";
import CardOfWord from '../CardOfWord/CardOfWord';
import styles from './MainTexbook.module.scss';

type Props = {
  words: IFullWordsForBook[]
  style: string
}

export const MainTexbook = ({ words, style }: Props) => {

  return (
    <div className={`${styles.container} ${styles.cardsEng}`}>
      {
        words.map((item) => {
          return <CardOfWord word={item.word}
            learned={item.learned}
            difficult={item.difficult === IDifficulty.hard}
            progress={item.progress}
            key={item.word.id}
            styleColor={style} />
        })
      }
    </div>
  )
}

export default MainTexbook