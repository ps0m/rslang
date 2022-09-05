import { useState, useEffect } from 'react'
import { ReactComponent as IconBurgerMenu } from '../../../assets/icon/burger.svg'
import Button from '../Button/Button'
import AuthButton from './AuthButton'
import styles from './Header.module.scss'
import PopUpMenu from '../PopUpMenu/PopUpMenu';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    if (menuActive) {
      document.body.classList.add("hiddenBody");
      document.body.style.overflow = "hidden";
     } else {
      document.body.classList.remove("hiddenBody");
      document.body.style.overflow = "visible";
     }
  }, [menuActive])
  

  return (
    <header className={`${styles.header} ${styles.container}`}>
      <div className={styles.header__wrapper}>
      {menuActive && <PopUpMenu setActive={setMenuActive} />}
        <Button
          onClick={() => setMenuActive((prevState) => !prevState)}>
          <IconBurgerMenu className={styles.button__BurgerMenu} />
        </Button>
        <div className={styles.header__wrapper__text}><h1>RS-Lang</h1></div>
      </div>

      <div className={styles.header__login}>
        <AuthButton />
      </div>
    </header>
  )
}

export default Header
