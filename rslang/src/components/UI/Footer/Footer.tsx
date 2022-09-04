import styles from './Footer.module.scss'


const Footer = () => {
  return (
    <footer className={`${styles.footer} ${styles.container}`}>
      <div className={styles.footer__project}>
        <a href='https://rs.school/js/'><img className={styles.footer__project_school} src={require(`../../../assets/icon/logo-rs.png`)} alt="logoRs" /></a>
        <a href='https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-2/rs-lang/rslang.md'><img className={styles.footer__project_task} src={require(`../../../assets/icon/logo-git.png`)} alt="logoGit" /></a>
      </div>

      <div className={styles.footer__team}>
        <a className={styles.footer__team_link} href='https://github.com/ZmitserFurmanau'>Źmićer Furmanaŭ</a>
        <a className={styles.footer__team_link} href='https://github.com/ps0m'>Sergey Pobudey</a>
        <a className={styles.footer__team_link} href='https://github.com/Glav-Tz'>GlavTz</a>
      </div>

      <div className={styles.footer__year}>2022г.</div>

    </footer>
  )
}

export default Footer

