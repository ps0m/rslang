import styles from './Header.module.scss'
import {textLogo, loginBtn} from './textHeader'
import Button from './button/Button'
import {Dispatch, SetStateAction} from 'react'

type Props = { setActive: Dispatch<SetStateAction<boolean>> }

const Header = ({ setActive }: Props) => {


  return (
<header className={`${styles.header} ${styles.container}`}>
  <div className={styles.header__wrapper}>    
    <div className={styles.header__wrapper__logo} onClick={() => setActive((prevState) => !prevState)}></div>
    <div className={styles.header__wrapper__text}>{textLogo}</div>
  </div>

  <div className={styles.header__login}><Button {...loginBtn}/></div>  
</header>
  )
}

export default Header
