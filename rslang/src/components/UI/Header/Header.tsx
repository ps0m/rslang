import { Dispatch, SetStateAction } from 'react'
import { ReactComponent as IconBurgerMenu} from '../../../assets/icon/burger.svg' 
import Button from '../Button/Button'
import styles from './Header.module.scss'

type Props = { setActive: Dispatch<SetStateAction<boolean>> }

const Header = ({ setActive }: Props) => {

  return (
    <header className={`${styles.header} ${styles.container}`}>
      <div className={styles.header__wrapper}>        
        <Button
          onClick={() => setActive((prevState) => !prevState)}>
            <IconBurgerMenu className={styles.button__BurgerMenu} />
        </Button>
        <div className={styles.header__wrapper__text}>RS-Lang</div>
      </div>

      <div className={styles.header__login}>
        <Button
          className={styles.button__login}
          onClick={() => ''}
        >Вход
        </Button>
      </div>
    </header>
  )
}

export default Header
