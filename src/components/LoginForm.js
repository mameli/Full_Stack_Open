import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ loginUser, loginMessage, loginError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      loginUser(user)
      setUsername('')
      setPassword('')
      loginMessage(`Welcome ${user.name}`)
    } catch (exception) {
      loginError('Wrong credentials')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginMessage: PropTypes.func.isRequired,
  loginError: PropTypes.func.isRequired
}

export default LoginForm
