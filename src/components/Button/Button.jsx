import './button.scss'

export const BigButton = ({ text, onClick }) => {
  return (
    <button type="submit" className="form__button button" onClick={onClick}>
      {text}
    </button>
  )
}
