import styles from './MainSection.module.scss'
import {titleRsLang, titleTextMain} from './textMainSection'

const MainSection = () => {
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
    </>
  )
}

export default MainSection