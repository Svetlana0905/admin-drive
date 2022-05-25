import { useState } from 'react'
export const ListDropdown = ({
  setInputText,
  textInput,
  data,
  placeholder
}) => {
  const [isVisible, setToggleVisible] = useState(false)

  const classesList = isVisible
    ? `content-header__list_open content-header__list`
    : `content-header__list`

  return (
    <>
      <label className="content-header__inner">
        <input
          onFocus={() => setToggleVisible(true)}
          onChange={(e) => {
            setInputText(e.target.value)
          }}
          value={textInput}
          type="text"
          className="content-header__input"
          onBlur={() => setToggleVisible(false)}
          placeholder={placeholder}
        />
      </label>
      <ul className={classesList}>
        {data
          ? data.map((item, id) => (
              <li
                key={item}
                onClick={(e) => {
                  setInputText(item)
                }}>
                {item}
              </li>
            ))
          : ''}
      </ul>
    </>
    //  <div className="content-header__wrapper">

    //  </div>
  )
}
