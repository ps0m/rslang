import CardMainTeam from './cardMainTeam'
import { descriptionTeam, textHeaderTeam } from './contentMainTeam'
import styles from './MainTeam.module.scss'

const MainTeam = () => {
  return (
    <>
      <section className={`${styles.MainTeam} ${styles.container}`}>
        <div className={`${styles.MainTeam__header}`}>{textHeaderTeam}</div>
        <div className={`${styles.teamWr}`}>
          {descriptionTeam.map((item, index) => {
            return <CardMainTeam
              imgItem={item.imgItem}
              nameItem={item.nameItem}
              roleTeam={item.roleTeam}
              link={item.link}
              discr={item.discr}
              key={index}
            />
          })
          }
        </div>
      </section>
    </>
  )
}

export default MainTeam