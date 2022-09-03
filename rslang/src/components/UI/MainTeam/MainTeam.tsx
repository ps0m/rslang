import styles from './MainTeam.module.scss'
import {textHeaderTeam, descriptionTeam} from './contentMainTeam'
import CardMainTeam from './cardMainTeam'

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