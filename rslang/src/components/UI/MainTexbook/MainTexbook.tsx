import { IWords } from "../../../types/types";
import CardOfWord from '../CardOfWord/CardOfWord';
import styles from './MainTexbook.module.scss';

type Props = {
  wordCards: IWords[]
}

export const MainTexbook = ({ wordCards }: Props) => {
  return (
    <div className={`${styles.container} ${styles.cardsEng}`}>
      {
        wordCards.map((item) => {
          return <CardOfWord word={item}
            learned={false}
            difficult={false}
            key={item.id} />
        })
      }
    </div>
  )
}

export default MainTexbook