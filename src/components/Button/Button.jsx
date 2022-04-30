import 'antd/dist/antd.css'
import { Button } from 'antd'
import './button.scss'

export const BigButton = ({ text, onClick }) => {
  return (
    <button type="submit" className="form__button button" onClick={onClick}>
      {text}
    </button>
  )
}
export const LinkButton = ({ text }) => {
  return <Button type="link">{text}</Button>
}
