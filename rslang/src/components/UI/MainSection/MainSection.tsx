import styles from './MainSection.module.scss'

const MainSection = () => {
  return (
    <>
      <section className={`${styles.mainSection} ${styles.container}`}>
        <div className={styles.mainSection__hero}>
          <div className={styles.mainSection__hero__heading}>
            Rolling School
            <h1>Курс разговорного английского языка</h1>
          </div>
          <div className={styles.mainSection__hero__img}></div>
        </div>
      </section>
    </>
  )
}

export default MainSection