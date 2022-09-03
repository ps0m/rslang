import styles from './MainTeam.module.scss'

interface IProps {
   imgItem: string, 
   nameItem: string, 
   roleTeam: string, 
   discr: string,
  }

const CardMainTeam = ({ imgItem, nameItem, roleTeam, discr }: IProps) => {
  
  return (    
    <div className={styles.teamCard}>
      <div className={styles.teamCard__wrHeader}>
        <img className={styles.teamCard__wrHeader_img} src={require(`../../../assets/img/${imgItem}.png`)} alt='carFeatures' />
        <div className={styles.teamCard__wrHeader_name}>{nameItem}</div>
        <div className={styles.teamCard__wrHeader_role}>{roleTeam}</div>
        <div className={styles.teamCard__wrHeader_discr}>{discr}</div>        
      </div>
    </div>
  )
}



export default CardMainTeam;