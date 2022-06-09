import { InputNumber } from 'antd'
import {
  getTankCar,
  getMinPriceCar,
  getMaxPriceCar
} from '../../redux/CarPageSlice'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux/'

export const InputNumberBlock = ({
  tank,
  setTank,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) => {
  const dispatch = useDispatch()
  const [errorNumberMax, setErrorNumberMax] = useState(false)

  useEffect(() => {
    if (!isNaN(tank)) dispatch(getTankCar(tank))
  }, [tank, dispatch])

  useEffect(() => {
    if (!isNaN(minPrice)) dispatch(getMinPriceCar(minPrice))
  }, [minPrice, dispatch])

  useEffect(() => {
    if (!isNaN(maxPrice)) dispatch(getMaxPriceCar(maxPrice))
    maxPrice < minPrice ? setErrorNumberMax(true) : setErrorNumberMax(false)
  }, [maxPrice, dispatch, minPrice])
  return (
    <div className="options-block__inputs-row">
      <label className="form__label label">
        <span className="label__span">Бензин (%)</span>
        <InputNumber
          value={tank}
          onChange={setTank}
          label="Бензин (%)"
          type="number"
        />
      </label>
      <label className="form__label label">
        <span className="label__span">Минимальная цена</span>
        <InputNumber
          value={minPrice}
          onChange={setMinPrice}
          label="Минимальная цена"
          type="number"
        />
      </label>
      <label className="form__label label">
        <span className="label__span">Максимальная цена</span>
        <InputNumber
          value={maxPrice}
          onChange={setMaxPrice}
          label="Максимальная цена"
          type="number"
        />
        <span className={errorNumberMax ? 'error__visible' : 'error__hidden'}>
          {'Меньше мин. цены'}
        </span>
      </label>
    </div>
  )
}
