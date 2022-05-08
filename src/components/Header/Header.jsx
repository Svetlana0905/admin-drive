import './header.scss'
import { Select } from 'antd'
import { InputSearch } from '../Button/Button'
import avatar from '../../assets/user-avatar.jpg'
import { ReactComponent as Notification } from '../../assets/icons/notifications.svg'

export const Header = () => {
  const { Option } = Select
  const handleChange = () => {}
  const onSearch = () => {}
  return (
    <header className="header">
      <InputSearch onSearch={onSearch} />
      <div className="header__admin-block">
        <div className="notification">
          <Notification className="notification__pic" />
          <span className="notification__count">2</span>
        </div>

        <img src={avatar} alt="avatar" className="avatar" />
        <Select
          defaultValue="Admin"
          bordered={false}
          style={{ width: 128 }}
          onChange={handleChange}>
          <Option value="Admin1">Admin1</Option>
          <Option value="Admin2">Admin2</Option>
        </Select>
      </div>
    </header>
  )
}
