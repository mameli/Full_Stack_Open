import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import noteService from '../services/notes'

const LoginForm = ({ loginUser, loginMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)
      setUsername('')
      setPassword('')
      loginUser(user)
    } catch (exception) {
      loginMessage('wrong credentials')
    }

    console.log('logging in with', username, password)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginMessage: PropTypes.func.isRequired,
}

export default LoginForm
