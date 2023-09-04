import React from 'react'
import styles from './loginScreen.module.css'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/inputs/input'
import { clearErrorLogin, loginRequest } from '../../store/authSystemReducer/loginSlice'
import { ClipLoader } from 'react-spinners'
import { Button } from '@mui/material'

const LoginPage = () => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isChecked, setIsChecked] = React.useState(false)
  const [isShowPassword, setIsShowPassword] = React.useState(false)
  const { isLoading, isError, successLogin } = useSelector((state) => state.loginSlice)

  React.useEffect(() => {
    setErrorMessage(isError)
    if (successLogin) {
      window.location.reload()
    }

  }, [isError, successLogin])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.trim().length > 0 && email.trim().length > 0) {
      dispatch(loginRequest({ email, password }))
    } else if (email.trim().length === 0) {
      setErrorMessage('partadir email')
    } else if (password.trim().length === 0) {
      setErrorMessage('partadir password')
    }
  }

  return (
    <div>
      <form className={styles.Form} autoComplete={isChecked ? 'on' : 'off'} onSubmit={handleSubmit}>
        <h1 className={styles.Title}>Z I K I</h1>
        <Input
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            dispatch(clearErrorLogin())
          }}
          error={isError?.trim()?.length > 0}
        />

        <Input
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            dispatch(clearErrorLogin())
          }}
          type={isShowPassword ? 'text' : 'password'}
          error={isError?.trim()?.length > 0}
          showPassword={isShowPassword}
          changeShowPassword={() => {
            setIsShowPassword(!isShowPassword)
          }}
          password={true}
        />
        <div className={styles.RememberMe}>
          <input
            type="checkbox"
            id="remember_me"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked)
            }}
          />
          <label htmlFor="remember_me">Remember Me</label>
        </div>
        <Button type="submit" variant="contained" style={{ width: 100 }}>
          {isLoading ? <ClipLoader loading={isLoading} size={20} color="white" /> : 'Sign In'}
        </Button>
        {<p className={styles.ErrorMessage}>{errorMessage}</p>}
      </form>
    </div>
  )
}
export default LoginPage
