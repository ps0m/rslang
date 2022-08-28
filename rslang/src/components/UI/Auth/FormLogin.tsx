import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from '../../UI/Auth/Auth.module.scss'
import { loginUser } from '../../API/API'

const FormLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useNavigate()
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await loginUser({email, password})
    setEmail('')
    setPassword('')
    if (localStorage.getItem('userData') !== null) {
      history('/')
    }

    window.location.reload()
    return false
  }

  const handleRoute = () => {
    history('/auth')
  }

  return (
    <div className={styles.form_container}>
      <div className={styles.title}>Welcome</div>
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <input
          className={styles.email_sign_in}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          value={email}
        />
        <input
          className={styles.password_sign_in}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
        />
        <input className={styles.login} type="submit" value="Login" />
      </form>
      <div className={styles.no_account} style={{ width: '100%' }}>Have no account yet?</div>
      <Link to="/register"><button className={styles.to_register} onClick={handleRoute} type="button">Registration</button></Link>
    </div>
  )
}

export default FormLogin