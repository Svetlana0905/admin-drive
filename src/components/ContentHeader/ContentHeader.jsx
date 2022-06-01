import './contentHeader.scss'
import { Spin } from 'antd'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { getCityId } from '../../redux/CitySlice'
// import { getStatusId } from '../../redux/StatusSlice'
// import { getCarId } from '../../redux/CarSlise'
import {
  useGetCityQuery,
  useGetStatusQuery,
  useGetCarQuery
} from '../../redux/'
import { ListDropdown } from '../ListDropdown/ListDropdown'
import { SmallButton } from '../Button/Button'

export const ContentHeader = ({ setPage }) => {
  // const dispatch = useDispatch()
  const { data: city = [], isSuccess: citySuccess } = useGetCityQuery()
  const {
    data: car = [],
    isLoading: carLoading,
    isSuccess: carSuccess
  } = useGetCarQuery()
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
    carArr = car.data.reduce((accum, item) => {
      return accum.includes(item.name) ? accum : [...accum, item.name]
    }, [])
  }
  if (citySuccess) {
    cityArr = city.data.reduce((accum, item) => {
      return accum.includes(item.name) ? accum : [...accum, item.name]
    }, [])
  }

  const clear = () => {
    setCityInput('')
    setStatusInput('')
    setCarInput('')
  }
  // useEffect(() => {
  //   setPage(0)
  //   dispatch(getCarId({ carInput, car }))
  // }, [carInput, dispatch, car, setPage])

  // useEffect(() => {
  //   setPage(0)
  //   dispatch(getCityId({ cityInput, city }))
  // }, [cityInput, dispatch, city, setPage])

  // useEffect(() => {
  //   setPage(0)
  //   dispatch(getStatusId({ statusInput, status }))
  // }, [statusInput, dispatch, status, setPage])

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
          />
        </div>
        <div className="content-header__wrapper">
          <ListDropdown
            placeholder="Статус"
            data={statusArr}
            setInputText={setStatusInput}
            textInput={statusInput}
          />
        </div>
        <div className="content-header__wrapper">
          <ListDropdown
            placeholder="Авто"
            data={carArr}
            setInputText={setCarInput}
            textInput={carInput}
          />
        </div>
      </div>
      <SmallButton text="Очистить" onClick={clear} />
    </section>
  )
}
