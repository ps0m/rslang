/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../../context/context'
import { initialStatistic } from '../../../helpers/helpers'
import { useFetch } from '../../../hooks/useFetch'
import { IAuth } from '../../../types/types'
import { createUser, loginUser, updateUserStatistics } from '../../API/API'
import styles from '../../UI/Auth/Auth.module.scss'
import Loader from '../Loader/Loader'

enum typeSubPage {
  registration,
  enter
}

const Auth = () => {
  const [subPage, setSubPage] = useState<typeSubPage>(typeSubPage.enter)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fetchAuth, isAuthLoad, AuthError] = useFetch(handleRegisterSubmit)

  const navigate = useNavigate();
  const { setIsAuth } = useContext(MyContext)


  async function handleRegisterSubmit() {

    if (subPage === typeSubPage.registration) {
      await createUser({ name, email, password });
    }
    const response: IAuth = await loginUser({ email, password })

    localStorage.setItem('rslang-ps0m', JSON.stringify(response));

    if (subPage === typeSubPage.registration) {
      await updateUserStatistics(response.userId, initialStatistic, response.token,)
    }

    setIsAuth(response)
    navigate(-1)
  }

  return (
    isAuthLoad
      ? <Loader></Loader>
      : <section className='game'>
        <div className={styles.form_container}>
          <div className={styles.title}>Войдите или зарегистрируйтесь</div>
          <form className={styles.form} onSubmit={(event) => {
            event.preventDefault()
            fetchAuth()
          }
          }>
            {AuthError.length !== 0
              ? <div className={styles.error}>{AuthError}</div>
              : ''
            }
            {subPage === typeSubPage.registration
              ? <input
                className={styles.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                type="text"
                value={name}
                name={name}
                required
              />
              : ''
            }

            <input
              className={styles.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Емейл"
              type="email"
              value={email}
              name={email}
              required
            />

            <input
              className={styles.password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              type="password"
              value={password}
              name={password}
              minLength={8}
              required
            />

            <input
              className={styles.button}
              type="submit"
              value={subPage === typeSubPage.registration
                ? "Зарегистрироваться"
                : "Войти"}
            />
            <div className={styles.no_account}>
              {subPage === typeSubPage.registration
                ? "Уже есть аккаунт?"
                : "Ещё нет аккаунта?"}

            </div>
            <button
              className={styles.button}
              type="button"
              onClick={() => {
                subPage === typeSubPage.registration
                  ? setSubPage(typeSubPage.enter)
                  : setSubPage(typeSubPage.registration)
              }}>
              {subPage === typeSubPage.registration
                ? "Вход"
                : "Регистарция"}
            </button>
          </form>

        </div>
      </section>
  )

}

export default Auth