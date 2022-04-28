import 'antd/dist/antd.css'
import './loginInput.scss'
import { Input, Space } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

export const InputLogin = ({ label, placeholder, value, status }) => {
  // console.log(status)
  return (
    <label className="form__label label">
      <span className="label__span">{label}</span>
      <Input
        placeholder={placeholder}
        type="text"
        value={value}
        status={status}
      />
      <span className={status === 'error' ? 'error__visible' : 'error__hidden'}>
        Error
      </span>
    </label>
  )
}

export const InputPassword = ({ placeholder, label, value, status }) => {
  // console.log(status)
  return (
    <label className="form__label label">
      <span className="label__span">{label}</span>
      <Space>
        <Input.Password
          value={value}
          status={status}
          placeholder={placeholder}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Space>
      <span className={status === 'error' ? 'error__visible' : 'error__hidden'}>
        Error
      </span>
    </label>
  )
}
