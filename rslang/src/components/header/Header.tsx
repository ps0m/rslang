import styles from './Header.module.scss'
import Button from '../button/Button'

const textLogo = 'RS-Lang'
const loginBtn = {
  classBtn: 'button__login',
  textBtn: 'Вход'
}

const Header = () => {
  return (
<header className={`${styles.header} ${styles.container}`}>
  <div className={styles.header__wrapper}>
    <div className={styles.header__wrapper__logo}></div>
    <div className={styles.header__wrapper__text}>{textLogo}</div>
  </div>

  <div className={styles.header__login}><Button {...loginBtn}/></div>  
</header>
  )
}

export default Header