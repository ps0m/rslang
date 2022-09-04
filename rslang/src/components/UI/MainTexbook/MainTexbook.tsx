import styles from './MainTexbook.module.scss'
import CardOfWord from '../CardOfWord/CardOfWord'
import { IWords } from "../../../types/types";

type Props = {
  wordCards: IWords[]
  style: string
}

export const MainTexbook = ({ wordCards, style }: Props) => {
  return (
    <div className={`${styles.container} ${styles.cardsEng}`}>
      {
        wordCards.map ((item) => {
          return <CardOfWord word={item} 
          learned={false} 
          difficult={false} 
          isAuth={false}
          key={item.id}
          styleColor={style}/>          
        })
      }      
    </div>
  )
}

export default MainTexbook