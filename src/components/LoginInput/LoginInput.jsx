import './loginInput.scss'
const LoginInput = ({
  label,
  placeHolder,
  setText,
  value,
  error,
  hideError,
  setInvalid
}) => {
  const changeTextHandler = (event) => {
    setText(event.target.value)
    hideError('')
    setInvalid(false)
  }

  return (
    <>
      <div className="input-form">
        <div className="label">{label}</div>
        <input
          className="input"
          placeholder={placeHolder}
          value={value}
          onChange={(event) => changeTextHandler(event)}
        />
      </div>
      {/* {error && <div>{error}</div>} */}
    </>
  )
}

export default LoginInput
