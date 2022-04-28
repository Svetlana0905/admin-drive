import './loginPage.scss'
import logoIcon from '../../assets/icons/logo_icon.svg'
import {
  InputLogin,
  InputPassword
} from '../../components/LoginInput/LoginInput'

import { BigButton } from '../../components/Button/Button'

export const LoginPage = () => {
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
            size="large"
            label="Почта"
            placeholder="Введите адрес эл.почты"
            type="text"
            status={'error'}
          />
          <InputPassword
            size="small"
            label="Пароль"
            placeholder="Введите пароль"
            status={''}
          />
          <div className="form__button-block">
            <span className="form__text text">Запросить доступ</span>
            <BigButton text={'Войти'} />
          </div>
        </form>
      </div>
    </section>
  )
}
