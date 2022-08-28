import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const history = useNavigate()
  const clearStorage = () => {
    window.localStorage.removeItem('userData')
    history('/')
  }

  return (
    <div>
      <button onClick={clearStorage} type="button">Logout</button>
    </div>
  )
}

export default Logout