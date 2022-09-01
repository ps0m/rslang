import styles from './MainTexbook.module.scss'
import CardOfWord from '../CardOfWord/CardOfWord'
import { IWords } from "../../../types/types";

type Props = {
  wordCards: IWords[]
}

export const MainTexbook = ({ wordCards }: Props) => {
  return (
    <div className={`${styles.container} ${styles.cardsEng}`}>
      {
        wordCards.map ((item) => {
          return <CardOfWord word={item} 
          learned={false} 
          difficult={false} 
          isAuth={false}
          key={item.id}/>
        })
      }      
    </div>
  )
}

export default MainTexbook