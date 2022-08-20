import styles from './MainPage.module.scss'
import Cards from '../cards/Cards'


// текст для main
const titleRsLang = 'Rolling School'
const titleTextMain = 'Крус разговорного английского языка'
// текст для карточек особенностей
const titleTextFeatures = 'Наше приложение умеет'
const cardOne = {
  cardImg: 'card1_featuresSection',
  title: 'Учи',
  description: 'Более 3500 слов',
}
const cardTwo = {
  cardImg: 'card2_featuresSection',
  title: 'Запоминай',
  description: 'Сохраняй сложные слова',
}
const cardThree = {
  cardImg: 'card3_featuresSection',
  title: 'Играй',
  description: 'Две увлекательные игры',
}
const cardFour = {
  cardImg: 'card4_featuresSection',
  title: 'Анализируй',
  description: 'Подробная статистика успеха',
}

const MainPage = () => {
  return (
    <>
      <section className={`${styles.mainSection} ${styles.container}`}>
        <div className={styles.mainSection__hero}>
          <div className={styles.mainSection__hero__heading}>
          {titleRsLang}
            <h1>{titleTextMain}</h1>
          </div>
          <div className={styles.mainSection__hero__img}></div>
        </div>
      </section>

      <section className={`${styles.featuresSection} ${styles.container}`}>
        <div className={styles.featuresSection__title}>{titleTextFeatures}</div>
        <div className={styles.featuresSection__wrapper}>
        <Cards {...cardOne} />
        <Cards {...cardTwo} />
        <Cards {...cardThree} />
        <Cards {...cardFour} />
        </div>
      </section>
    </>



  )
}

export default MainPage