import './header.scss'
import { InputSearch } from '../Button/Button'
import avatar from '../../assets/user-avatar.jpg'
import { ReactComponent as Notification } from '../../assets/icons/notifications.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../redux'

export const Header = () => {
  const navigate = useNavigate()
  const [isVisibleButton, setIsVisibleButton] = useState(false)
  const [logout] = useLogoutMutation()
  const openButton = () => {
    setIsVisibleButton(!isVisibleButton)
  }
  const logoutAdmin = async () => {
    await logout().unwrap
    navigate('/', { replace: true })
  }
  const onSearch = () => {}

  return (
    <header className="header">
      <InputSearch onSearch={onSearch} />
      <div className="header__admin-block">
        <div className="notification">
          <Notification className="notification__pic" />
          <span className="notification__count">2</span>
        </div>
        <div className="logout-block">
          <div className="logout-block__inner-top">
            <img src={avatar} alt="avatar" className="avatar" />
            <button
              type="button"
              onClick={openButton}
              className="logout-block__button-open">
              Admin
            </button>
          </div>
          <div
            className={
              isVisibleButton
                ? 'logout-block__inner-bottom'
                : 'logout-block__inner-bottom-hidden'
            }>
            <button
              className="logout-block__button-logout"
              onClick={logoutAdmin}>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
