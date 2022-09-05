import styles from './Card.module.scss'

interface ICardProps {
  cardImg: string,
  title: string,
  description: string,
}

const Cards = ({ cardImg, title, description }: ICardProps) => {

  return (
    <div className={styles.cards__wrapper}>
      <img className={styles.cards__wrapper_img} src={require(`../../../assets/img/${cardImg}.png`)} alt='carFeatures' />
      <div className={styles.cards__wrapper_title}>{title}</div>
      <div className={styles.cards__wrapper_description}>{description}</div>
    </div>
  )
}

export default Cards
