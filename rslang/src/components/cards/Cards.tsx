import styles from './Cards.module.scss'
import {ICardProps} from '../interface'


const Cards = (props:ICardProps) => {
  const {cardImg, title, description} = props;
  return (    
    <div className={styles.cars__wrapper}>
      <img className={styles.cars__wrapper_img} src={require(`../../assets/img/${cardImg}.png`)} alt='carFeatures' />
      <div className={styles.cars__wrapper_title}>{title}</div>
      <div className={styles.cars__wrapper_description}>{description}</div>
    </div> 
  )
}

export default Cards