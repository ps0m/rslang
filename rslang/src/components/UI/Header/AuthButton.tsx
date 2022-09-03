import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'

const AuthButton = () => {
  const [value, setValue] = useState(false)
  const history = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('userData') !== null) {
      setValue(true)
    }
  }, [])
  const clearStorage = () => {
    window.localStorage.removeItem('userData')
    setValue(false)
    history('/')
  }

  return (
    <div className={styles.button__login}>
      <Link to="/auth"><button className="log" onClick={clearStorage} type="button">{value ? 'Выход' : 'Вход'}</button>
      </Link>
    </div>
  )
}

export default AuthButton