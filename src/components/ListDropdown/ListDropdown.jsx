import { ClearInputButton } from '../Button/Button'
import { useState } from 'react'
export const ListDropdown = ({
  setInputText,
  textInput,
  data,
  placeholder,
  name,
  textSpan,
  clearInput
}) => {
  const [isVisible, setToggleVisible] = useState(false)
  const classesList = isVisible
    ? `content-header__list_open content-header__list`
    : `content-header__list`

  return (
    <>
      <label className="content-header__inner">
        <span className="content-header__text-span text">{textSpan}</span>
        <input
          disabled={!data}
          onFocus={() => setToggleVisible(true)}
          onChange={(e) => {
            setInputText(e.target.value)
          }}
          value={textInput || ''}
          type="text"
          className="content-header__input"
          onBlur={() => setToggleVisible(false)}
          placeholder={placeholder}
        />
        {textInput && <ClearInputButton clearInput={clearInput} />}
      </label>
      <ul className={classesList}>
        {data
          ? data.map((item, id) => (
              <li
                key={id}
                onClick={(e) => {
                  setInputText(name === 'point' ? item.name : item)
                }}>
                {name === 'point' ? item.name : item}
              </li>
            ))
          : ''}
      </ul>
    </>
  )
}
