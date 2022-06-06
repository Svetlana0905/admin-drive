import 'antd/dist/antd.css'
import './loginInput.scss'
import { Input, Space } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

export const InputStandart = ({
  label,
  placeholder,
  value,
  status,
  onChange,
  innerRef,
  size,
  textError
}) => {
  // console.log(status)
  return (
    <label className={size ? 'label label__small' : 'form__label label'}>
      <span className="label__span">{label}</span>
      <Input
        placeholder={placeholder}
        type="text"
        value={value}
        status={status}
        ref={innerRef}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className={status === 'error' ? 'error__visible' : 'error__hidden'}>
        {textError}
      </span>
    </label>
  )
}

export const InputPassword = ({
  placeholder,
  label,
  value,
  status,
  onChange,
  textError
}) => {
  return (
    <label className="form__label label">
      <span className="label__span">{label}</span>
      <Space>
        <Input.Password
          value={value}
          onChange={(e) => onChange(e.target.value)}
          status={status}
          placeholder={placeholder}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Space>
      <span className={status === 'error' ? 'error__visible' : 'error__hidden'}>
        {textError}
      </span>
    </label>
  )
}
