import './carsetting.scss'
import { Link, useLocation } from 'react-router-dom'
import { BigButton } from '../../components/Button/Button'
import { InputStandart } from '../../components/LoginInput/LoginInput'
import { GetColorCar } from '../../components/GetColorCar/GetColorCar'
import { AddCarImage } from './AddCarImage'
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
  getDescriptionCar,
  getTankCar,
  getMinPriceCar,
  getMaxPriceCar,
  getCategoryCar,
  getThumbnail,
  getDataCarFromredux
} from '../../redux/CarPageSlice'

export const CarSetting = () => {
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
  const [description, setDescription] = useState(
    state?.description ? state.description : ''
  )
  const [tank, setTank] = useState(state?.tank ? state.tank : '')
  const [errorNumberTank, setErrorNumberTank] = useState(false)
  const [minPrice, setMinPrice] = useState(
    state?.priceMin ? state.priceMin : ''
  )
  const [errorNumberMin, setErrorNumberMin] = useState(false)
  const [maxPrice, setMaxPrice] = useState(
    state?.priceMax ? state.priceMax : ''
  )
  const [errorNumberMax, setErrorNumberMax] = useState(false)
  const [file, setFile] = useState('')
  const [carThumbnail, setThumbnail] = useState(
    state?.thumbnail ? state.thumbnail : {}
  )
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
    dispatch(getDescriptionCar(description))
  }, [description, dispatch])

  useEffect(() => {
    if (!isNaN(tank)) {
      dispatch(getTankCar(tank))
      setErrorNumberTank(false)
    } else {
      setErrorNumberTank(true)
    }
  }, [tank, dispatch])

  useEffect(() => {
    if (!isNaN(minPrice)) {
      dispatch(getMinPriceCar(minPrice))
      setErrorNumberMin(false)
    } else {
      setErrorNumberMin(true)
    }
  }, [minPrice, dispatch])

  useEffect(() => {
    if (!isNaN(maxPrice) && maxPrice > minPrice) {
      dispatch(getMaxPriceCar(maxPrice))
      setErrorNumberMax(false)
    } else {
      setErrorNumberMax(true)
    }
  }, [maxPrice, dispatch, minPrice])

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
    setDescription('')
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
    console.log(isError + ' ошибка запроса на добавление')
    console.log(errorChange + ' ошибка запроса на изменение')
  }, [isError])

  const addItem = async () => {
    const data = dataState
    await carAddRequest({ data }).unwrap()
    setIsDisabledBtn(true)
  }
  const changeCar = async () => {
    const { ...data } = dataState
    data.id = state.id
    await carChangeRequest({ data, id: state.id }).unwrap
    setIsDisabledBtn(true)
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
          description={description}
          percent={percent}
          setPercent={setPercent}
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
              <InputStandart
                value={description}
                onChange={setDescription}
                label="Описание"
                type="text"
              />
            </div>
            <div className="options-block__inputs-row">
              <InputStandart
                value={tank}
                onChange={setTank}
                label="Бензин (%)"
                type="text"
                status={errorNumberTank ? 'error' : ''}
                textError={errorNumberTank ? 'Должно быть число' : ''}
              />
              <InputStandart
                value={minPrice}
                onChange={setMinPrice}
                label="Минимальная цена"
                type="text"
                status={errorNumberMin ? 'error' : ''}
                textError={errorNumberMin ? 'Должно быть число' : ''}
              />
              <InputStandart
                value={maxPrice}
                onChange={setMaxPrice}
                label="Максимальная цена"
                type="text"
                status={errorNumberMax ? 'error' : ''}
                textError={errorNumberMax ? 'Число. Больше мин. цены' : ''}
              />
            </div>
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
              text="Удалить"
              onClick={clearData}
            />
          </div>
        </div>
      </div>
    </>
  )
}
