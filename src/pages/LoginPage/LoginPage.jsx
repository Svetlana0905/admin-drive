import './loginPage.scss'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import logoIcon from '../../assets/icons/logo_icon.svg'
import {
  InputStandart,
  InputPassword
} from '../../components/LoginInput/LoginInput'
import { BigButton } from '../../components/Button/Button'
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux'
import { setCredentials } from '../../redux/adminSlice'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const userRef = useRef()
  const navigate = useNavigate()
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [mailError, setMailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [invalidErrorMail, setInvalidMail] = useState('')
  const [invalidErrorPassword, setInvalidPassword] = useState('')
  const [login, { isError, data, error }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (!mail) {
      setMailError('Введите почту')
      setInvalidMail('error')
    }
    if (!password) {
      setPasswordError('Введите пароль')
      setInvalidPassword('error')
    }
    if (password && mail) {
      await login({ username: mail, password: password }).unwrap()
      setMail('')
      setPassword('')
    }
    if (isError) {
      setInvalidMail('error')
      setInvalidPassword('error')
    }
  }

  useEffect(() => {
    if (data) {
      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('refreshToken', data.refresh_token)
      localStorage.setItem('tokenExpires', data.expires_in.toString())
      dispatch(setCredentials(data))
      navigate('admin/point', { replace: true })
    }
  }, [data, dispatch, navigate])

  useEffect(() => {
    if (error) navigate('error', { replace: true, state: error })
  }, [error, navigate])

  return (
    <section className="login">
      <div className="login__column">
        <div className="logo__block">
          <img src={logoIcon} alt="logo need for drive" />
          <span className="">Need for drive</span>
        </div>
        <form className="form">
          <p className="form__subtitle subtitle">Вход</p>
          <InputStandart
            value={mail}
            onChange={setMail}
            label="Почта"
            placeholder="Введите адрес эл.почты"
            type="text"
            status={invalidErrorMail}
            textError={mailError}
            innerRef={userRef}
          />
          <InputPassword
            value={password}
            onChange={setPassword}
            label="Пароль"
            placeholder="Введите пароль"
            status={invalidErrorPassword}
            textError={passwordError}
          />
          <div className="form__button-block">
            <div className="form__button-link">
              <Button type="link">Запросить доступ</Button>
            </div>
            <BigButton text={'Войти'} onClick={handleAddProduct} />
          </div>
        </form>
      </div>
    </section>
  )
}
