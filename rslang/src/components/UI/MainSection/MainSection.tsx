import styles from './MainSection.module.scss'

const MainSection = () => {
  return (
    <>
      <section className={`${styles.mainSection} ${styles.container}`}>
        <div className={styles.mainSection__hero}>
          <div className={styles.mainSection__hero__heading}>
            <div className={styles.mainSection__hero__heading_color}>Rolling School</div>
            Курс разговорного английского языка
          </div>
          <img className={styles.mainSection__hero__img} src={require("../../../assets/img/hero_mainPage.png")} alt="heroLang" />
        </div>
      </section>
    </>
  )
}

export default MainSection
