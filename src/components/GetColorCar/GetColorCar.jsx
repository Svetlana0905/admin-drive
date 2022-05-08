import './getColor.scss'
import { Checkbox } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { InputStandart } from '../../components/LoginInput/LoginInput'
import { getColorsCar } from '../../redux/CarSlise'

export const GetColorCar = () => {
  const dispatch = useDispatch()
  const [color, setColor] = useState('')
  const [arrCheckbox, setArrCheckbox] = useState([])
  const [checkedState, setCheckedState] = useState([])

  const addColor = (e) => {
    e.preventDefault()
    if (!arrCheckbox.includes(color) && color) {
      setArrCheckbox((arrCheckbox) => [...arrCheckbox, color])
      setCheckedState((checkedState) => [...checkedState, false])
    }
    setColor('')
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    const colorArr = updatedCheckedState.reduce((accum, item, index) => {
      if (item === true) {
        accum.push(arrCheckbox[index])
      }
      return accum
    }, [])

    setCheckedState(updatedCheckedState)
    dispatch(getColorsCar(colorArr))
  }
  return (
    <div className="options-block__inputs-color inputs-color">
      <div className="inputs-color__inner">
        <InputStandart
          value={color}
          onChange={setColor}
          label="Доступные цвета"
          placeholder="Введите цвет"
          type="text"
          size="small"
        />
        <button className="inputs-color__btn" onClick={addColor}></button>
      </div>
      <div className="inputs-color__checkbox-block">
        {arrCheckbox.length
          ? arrCheckbox.map((item, index) => (
              <Checkbox
                key={item}
                onChange={() => handleOnChange(index)}
                checked={checkedState[index]}
                name={item}>
                {item}
              </Checkbox>
            ))
          : ''}
      </div>
    </div>
  )
}
