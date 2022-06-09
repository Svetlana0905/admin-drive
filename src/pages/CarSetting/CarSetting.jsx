import './carsetting.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BigButton } from '../../components/Button/Button'
import { InputStandart } from '../../components/LoginInput/LoginInput'
import { GetColorCar } from '../../components/GetColorCar/GetColorCar'
import { InputNumberBlock } from './InputNumberBlock'
import { AddCarImage } from './AddCarImage'
import { getStatusAlert } from '../../redux/alertSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/'
import { Spin } from 'antd'
import { ListDropdown } from '../../components/ListDropdown/ListDropdown'
import {
  useGetCategoryQuery,
  useAddCarMutation,
  useChangeCarDataMutation
} from '../../redux'
import {
  getNameCar,
  getNumberCar,
  getCategoryCar,
  getThumbnail,
  getDataCarFromredux
} from '../../redux/CarPageSlice'

export const CarSetting = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state } = useLocation()
  const { data: category = [], isLoading, isSuccess } = useGetCategoryQuery()
  const [carAddRequest, { isError }] = useAddCarMutation()
  const [carChangeRequest, { isError: errorChange }] =
    useChangeCarDataMutation()
  const dataState = useSelector((state) => state.carPage.data)
  const [percent, setPercent] = useState(0)

  const [model, setModel] = useState(state?.name ? state.name : '')
  const [number, setNumber] = useState(state?.number ? state.number : '')

  const [tank, setTank] = useState(state?.tank ? state.tank : '')
  const [minPrice, setMinPrice] = useState(
    state?.priceMin ? state.priceMin : ''
  )
  const [maxPrice, setMaxPrice] = useState(
    state?.priceMax ? state.priceMax : ''
  )
  const [carThumbnail, setThumbnail] = useState(
    state?.thumbnail ? state.thumbnail : {}
  )
  const [file, setFile] = useState('')
  const [type, setType] = useState(
    state?.categoryId?.name ? state.categoryId.name : ''
  )
  const [colors, setColors] = useState(state?.colors ? state.colors : [])
  const [isDisabledBtn, setIsDisabledBtn] = useState(false)

  useEffect(() => {
    dispatch(getNameCar(model))
  }, [model, dispatch])

  useEffect(() => {
    dispatch(getNumberCar(number))
  }, [number, dispatch])

  useEffect(() => {
    let categoryId = {}
    if (type && category && isSuccess) {
      categoryId = category.data.filter(
        (item) => item.name && item.name === type
      )
      dispatch(getCategoryCar(categoryId[0]))
    }
  }, [type, category, dispatch, isSuccess])

  useEffect(() => {
    if (carThumbnail) {
      dispatch(getThumbnail(carThumbnail))
    }
  }, [file, dispatch, carThumbnail])
  const clearListDropdown = () => {
    setType('')
    dispatch(getCategoryCar({}))
  }

  const clearData = () => {
    setModel('')
    setNumber('')
    setTank('')
    setMinPrice('')
    setMaxPrice('')
    setIsDisabledBtn(true)
    setThumbnail({})
    setFile('')
    setColors([])
    dispatch(getDataCarFromredux({}))
    setPercent(0)
  }
  useEffect(() => {
    percent === 100 ? setIsDisabledBtn(false) : setIsDisabledBtn(true)
  }, [percent])
  useEffect(() => {
    if (isError || errorChange) {
      navigate('*')
    }
  }, [isError, errorChange, navigate])

  const addItem = async () => {
    const data = dataState
    await carAddRequest({ data }).unwrap()
    setIsDisabledBtn(true)
    setTimeout(() => {
      dispatch(getStatusAlert('Машина была успешно добавлена!'))
      navigate('/admin/cars-list')
    }, 2500)
  }
  const goBack = () => navigate(-1)
  const changeCar = async () => {
    const { ...data } = dataState
    data.id = state.id
    await carChangeRequest({ data, id: state.id }).unwrap
    setIsDisabledBtn(true)
    setTimeout(() => {
      dispatch(getStatusAlert('Машина была успешно изменена!'))
      goBack()
    }, 2500)
  }
  if (isLoading) return <Spin tip="Loading..." size="large" />
  return (
    <>
      <h2 className="title title__car">Карточка автомобиля</h2>
      <div className="content-car">
        <AddCarImage
          setThumbnail={setThumbnail}
          setFile={setFile}
          file={file}
          carThumbnail={carThumbnail}
          percent={percent}
          setPercent={setPercent}
          state={state}
        />
        <div className="content-car__options-block">
          <p className="options-block__heading heading">Настройки автомобиля</p>
          <div className="options-block__inputs-column">
            <div className="options-block__inputs-row">
              <InputStandart
                value={model}
                onChange={setModel}
                label="Модель автомобиля"
                type="text"
              />
              <InputStandart
                value={number}
                onChange={setNumber}
                label="Номер"
                type="text"
              />
            </div>
            <InputNumberBlock
              tank={tank}
              setTank={setTank}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
            <div className="content-header__wrapper">
              <ListDropdown
                data={category.data.map((item) => item.name)}
                setInputText={setType}
                textInput={type}
                textSpan="Выберите тип авто"
                name="car"
                clearInput={clearListDropdown}
              />
            </div>
            <GetColorCar colors={colors} />
          </div>
          <div className="options-block__buttons-block">
            <div className="options-block__neighboring-button">
              <BigButton
                text={state ? 'Сохранить' : 'Добавить'}
                onClick={state ? changeCar : addItem}
                disabled={isDisabledBtn}
              />
              <Link
                to="/admin/cars-list"
                className="button button__small button__small-link">
                <span>Отменить</span>
              </Link>
            </div>
            <BigButton
              deleteBtn="deleteBtn"
              text="Очистить"
              onClick={clearData}
            />
          </div>
        </div>
      </div>
    </>
  )
}
