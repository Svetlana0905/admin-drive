import './carsetting.scss'
import { BigButton, InputFile } from '../../components/Button/Button'
import { InputStandart } from '../../components/LoginInput/LoginInput'
import { GetColorCar } from '../../components/GetColorCar/GetColorCar'
import { GetImage } from '../../components/GetImage/GetImage'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getNameCar,
  getCategoryId,
  getThumbnail,
  getDescription
} from '../../redux/CarSlise'

export const CarSetting = () => {
  const dispatch = useDispatch()
  const colorsArray = useSelector((state) => state.carSlice.colors)
  const [colorsIvalid, setColorsInvalid] = useState('')
  const [file, setFile] = useState('')
  const [carThumbnail, setThumbnail] = useState({})
  const [errorThumbnail, setErrorThumbnail] = useState(false)
  const [model, setModel] = useState('')
  const [invalidErrorModel, setInvalidModel] = useState('')
  const [type, setType] = useState('')
  const [invalidErrorType, setInvalidType] = useState('')
  // const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (model) {
      setInvalidModel('')
      dispatch(getNameCar(model))
    }
  }, [model, dispatch])

  useEffect(() => {
    if (type) {
      dispatch(getCategoryId(type))
      setInvalidType('')
    }
  }, [type, dispatch])

  useEffect(() => {
    if (file) {
      setErrorThumbnail(false)
      dispatch(getThumbnail(carThumbnail))
    }
  }, [setErrorThumbnail, file, dispatch, carThumbnail])

  const getCarOptionsHandler = (e) => {
    e.preventDefault()
    if (!model) {
      setInvalidModel('error')
    }
    if (!type) {
      setInvalidType('error')
    }
    if (!Object.keys(carThumbnail).length) {
      setErrorThumbnail(true)
    }
    if (colorsArray.length === 0) {
      setColorsInvalid('error')
    }
  }

  return (
    <>
      <h2 className="title title__car">Карточка автомобиля</h2>
      <form className="content">
        <div className="content__car-block car-block">
          <div className="car-block__file-block">
            <GetImage file={file} setThumbnail={setThumbnail} />
            {model ? (
              <p className="car-block__logo-text logo-text">{model}</p>
            ) : (
              ''
            )}
            {type ? (
              <span className="car-block__caption thin">{type}</span>
            ) : (
              ''
            )}

            <InputFile getFile={setFile} errorThumbnail={errorThumbnail} />
          </div>
          <label className="car-block__progress-block progress-block">
            <p className="progress-block__title-block">
              <span className="car-block__caption thin">Заполнено</span>
              <span className="small-roboto">70%</span>
            </p>
            <progress
              className="progress"
              min="0"
              value="70"
              max="100"></progress>
          </label>
          <div className="car-block__definition definition">
            <span className="car-block__caption">Описание</span>
            <textarea
              placeholder="Добавьте описание"
              rows="5"
              cols="33"
              onChange={(e) => dispatch(getDescription(e.target.value))}
              // Не знаю, нужна ли обработка не отсутствие описания?
            />
          </div>
        </div>
        <div className="content__options-block">
          <p className="options-block__heading heading">Настройки автомобиля</p>
          <div className="options-block__inputs-column">
            <div className="options-block__inputs-row">
              <InputStandart
                value={model}
                onChange={setModel}
                label="Модель автомобиля"
                placeholder="Введите модель"
                type="text"
                status={invalidErrorModel}
              />
              <InputStandart
                value={type}
                onChange={setType}
                label="Тип автомобиля"
                placeholder="Введите тип"
                type="text"
                status={invalidErrorType}
              />
            </div>
            <GetColorCar
              colorsIvalid={colorsIvalid}
              setColorsInvalid={setColorsInvalid}
            />
          </div>
          <div className="options-block__buttons-block">
            <div className="options-block__neighboring-button">
              <BigButton text="Сохранить" onClick={getCarOptionsHandler} />
              <BigButton text="Отменить" disabled="disabled" />
            </div>
            <BigButton delite="delite" text="Удалить" />
          </div>
        </div>
      </form>
    </>
  )
}
