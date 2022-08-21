import styles from './FeaturesSection.module.scss'
import Cards from '../cards/Cards'
import {titleTextFeatures, cardOne, cardTwo, cardThree, cardFour} from './textFeaturesSection'

const FeaturesSection = () => {
  return (
    <>
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

// {
//   arrCards.map((card, index) => {
//     return <Cards
//       card={card}
//       key={index} />
//   })
// }

export default FeaturesSection
