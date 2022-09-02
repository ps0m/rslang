import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../UI/Auth/Auth.module.scss'
import { createUser } from '../../API/API'

const FormRegister = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useNavigate()
  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await createUser({name, email, password})
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleRoute = () => {
    history('/auth')
  }

  return (

    <div className={styles.auth}>
      <div className={styles.form_container}>
        <div className={styles.title}>Welcome</div>
        <form className={styles.form} onSubmit={handleRegisterSubmit}>
          <input
            className={styles.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <input
            className={styles.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            value={email}
          />
          <input
            className={styles.password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
          <input className={styles.login} type="submit" value="Register" />
        </form>
        <div className={styles.no_account}>Already have an account?</div>
        <button className={styles.to_register} onClick={handleRoute} type="button">
          Login
        </button>
      </div>
    </div>
  )
}

export default FormRegister