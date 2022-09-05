import Cards from '../Card/Card'
import styles from './FeaturesSection.module.scss'
import { arrCards, titleTextFeatures } from './textFeaturesSection'

const FeaturesSection = () => {
  return (
    <>
      <section className={`${styles.featuresSection} ${styles.container}`}>
        <div className={styles.featuresSection__title}>{titleTextFeatures}</div>
        <div className={styles.featuresSection__wrapper}>
          {arrCards.map((card, index) => {
            return <Cards
              cardImg={card.cardImg}
              title={card.title}
              description={card.description}
              key={index}
            />
          })
          }
        </div>
      </section>
    </>
  )
}

export default FeaturesSection
