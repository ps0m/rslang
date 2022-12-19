import styles from './MainTeam.module.scss';

interface IProps {
  imgItem: string,
  nameItem: string,
  roleTeam: string,
  discr: string,
  link: string
}

const CardMainTeam = ({ imgItem, nameItem, roleTeam, discr, link }: IProps) => {

  return (
    <div className={styles.teamCard}>
      <a href={link} target={'_blank'} rel="noreferrer">
        <div className={styles.teamCard__wrHeader}>
          <img className={styles.teamCard__wrHeader_img} src={require(`../../../assets/img/${imgItem}.png`)} alt='carFeatures' />
          <div className={styles.teamCard__wrHeader_name}>{nameItem}</div>
          <div className={styles.teamCard__wrHeader_role}>{roleTeam}</div>
          <div className={styles.teamCard__wrHeader_discr}>{discr}</div>
        </div>
      </a>
    </div>
  )
}

export default CardMainTeam;