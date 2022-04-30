import './loginPage.scss'
import logoIcon from '../../assets/icons/logo_icon.svg'
import {
  InputLogin,
  InputPassword
} from '../../components/LoginInput/LoginInput'
import { BigButton, LinkButton } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAuth } from '../../redux/authSlice'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const statusAuth = useSelector((state) => state.authSlice.status)
  const tok = useSelector((state) => state.authSlice.res)
  const navigate = useNavigate()
  const userRef = useRef()
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [mailError, setMailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [invalidErrorMail, setInvalidMail] = useState('')
  const [invalidErrorPassword, setInvalidPassword] = useState('')

  useEffect(() => {
    console.log(tok)
    console.log(statusAuth)
    if (statusAuth === 'resolved') navigate('admin', { replace: true })
  }, [statusAuth, navigate, tok])

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const logInHandler = (e) => {
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
      setInvalidPassword('')
      setInvalidMail('')
      dispatch(postAuth({ mail, password }))
    }
  }
  return (
    <section className="login">
      <div className="login__column">
        <div className="logo__block">
          <img src={logoIcon} alt="logo need for drive" />
          <span className="">Need for drive</span>
        </div>
        <form className="form">
          <p className="form__subtitle subtitle">Вход</p>
          <InputLogin
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
            {/* <span className="form__text text">Запросить доступ</span> */}
            <LinkButton type="link" text="Запросить доступ" />
            <BigButton text={'Войти'} onClick={logInHandler} />
          </div>
        </form>
      </div>
    </section>
  )
}
