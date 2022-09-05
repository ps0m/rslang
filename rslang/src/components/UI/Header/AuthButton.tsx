import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../../context/context';
import styles from './Header.module.scss';

const AuthButton = () => {
  const { isAuth, setIsAuth } = useContext(MyContext)
  const history = useNavigate();

  const logOut = () => {
    localStorage.removeItem('rslang-ps0m')
    setIsAuth(null)
    history('/home')
  }

  return (
    <button
      className={styles.button__login}
      onClick={(e) => {
        e.preventDefault();
        isAuth !== null
          ? logOut()
          : ''
      }}
    >
      {
        isAuth !== null
          ? <>
            <span className={styles.button__login_yes}>{isAuth.name[0]}</span>
            <span className={styles.button__login_hover}>Выход</span>
          </>
          : <Link to="/auth">
            Вход
          </Link>
      }
    </button>
  )
}

export default AuthButton