import './contentHeader.scss'
import { Spin } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCityId } from '../../redux/CitySlice'
import { getStatusId } from '../../redux/StatusSlice'
import { getCarId, getCarData } from '../../redux/CarSlise'
import {
  useGetCityQuery,
  useGetStatusQuery,
  useGetCarQuery
} from '../../redux/'
import { ListDropdown } from '../ListDropdown/ListDropdown'
import { SmallButton } from '../Button/Button'

export const ContentHeader = ({ setPage }) => {
  const page = 4
  const dispatch = useDispatch()
  const { data: city = [], isSuccess: citySuccess } = useGetCityQuery({
    page: page,
    limit: 0
  })
  const {
    data: car = [],
    isLoading: carLoading,
    isSuccess: carSuccess
  } = useGetCarQuery({ page: 0, limit: 0 })
  const {
    data: status = [],
    isLoading: statusLoading,
    isSuccess: statusSuccess
  } = useGetStatusQuery()

  const [cityInput, setCityInput] = useState('')
  const [statusInput, setStatusInput] = useState('')
  const [carInput, setCarInput] = useState('')

  let cityArr = []
  let statusArr = []
  let carArr = []

  if (statusSuccess) {
    statusArr = status.data.map((item) => item.name)
  }
  if (carSuccess) {
    carArr = Array.from(new Set(car.data.map((e) => e.name)))
    dispatch(getCarData(car))
  }
  if (citySuccess) {
    cityArr = Array.from(new Set(city.data.map((e) => e.name)))
  }

  const clear = () => {
    setCityInput('')
    setStatusInput('')
    setCarInput('')
  }
  useEffect(() => {
    setPage(0)
    dispatch(getCarId({ carInput, car }))
  }, [carInput, dispatch, car, setPage])

  useEffect(() => {
    setPage(0)
    dispatch(getCityId({ cityInput, city }))
  }, [cityInput, dispatch, city, setPage])

  useEffect(() => {
    setPage(0)
    dispatch(getStatusId({ statusInput, status }))
  }, [statusInput, dispatch, status, setPage])
  const clearCity = () => {
    setCityInput('')
  }
  const clearStatus = () => {
    setStatusInput('')
  }
  const clearCar = () => {
    setCarInput('')
  }
  if (statusLoading || carLoading)
    return (
      carLoading && (
        <section className="content-header">
          <Spin />
        </section>
      )
    )

  return (
    <section className="content-header">
      <div className="content-header__btn-block">
        <div className="content-header__wrapper">
          <ListDropdown
            placeholder="Город"
            data={cityArr}
            setInputText={setCityInput}
            textInput={cityInput}
            clearInput={clearCity}
            textSpan="Выберите город"
          />
        </div>
        <div className="content-header__wrapper">
          <ListDropdown
            placeholder="Статус"
            data={statusArr}
            setInputText={setStatusInput}
            textInput={statusInput}
            clearInput={clearStatus}
            textSpan="Выберите статус"
          />
        </div>
        <div className="content-header__wrapper">
          <ListDropdown
            placeholder="Авто"
            data={carArr}
            setInputText={setCarInput}
            textInput={carInput}
            clearInput={clearCar}
            textSpan="Выберите авто"
          />
        </div>
      </div>
      <div className="content-header__btn-block">
        <SmallButton text="Очистить" onClick={clear} />
      </div>
    </section>
  )
}
