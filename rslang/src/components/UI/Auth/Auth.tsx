import React from 'react'
import styles from '../../UI/Auth/Auth.module.scss'
import FormLogin from './FormLogin'

const Auth = () => {
  return (
    <div className={styles.auth}>
      <FormLogin />
    </div>
  )
}

export default Auth