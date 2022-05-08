import './carsetting.scss'
import { BigButton, InputFile } from '../../components/Button/Button'
import { InputStandart } from '../../components/LoginInput/LoginInput'
import { GetColorCar } from '../../components/GetColorCar/GetColorCar'
import { GetImage } from '../../components/GetImage/GetImage'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getNameCar,
  getCategoryId,
  getThumbnail,
  getDescription
} from '../../redux/CarSlise'

export const CarSetting = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState('')
  const [carThumbnail, setThumbnail] = useState({})
  const [model, setModel] = useState('')
  const [modelError, setModelError] = useState('')
  const [invalidErrorModel, setInvalidModel] = useState('')
  const [type, setType] = useState('')
  const [typeError, setTypeError] = useState('')
  const [invalidErrorType, setInvalidType] = useState('')
  // const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (model) dispatch(getNameCar(model))
  }, [model, dispatch])

  useEffect(() => {
    if (type) dispatch(getCategoryId(type))
  }, [type, dispatch])

  useEffect(() => {
    if (file) dispatch(getThumbnail(carThumbnail))
  })

  const getCarOptionsHandler = (e) => {
    e.preventDefault()
    if (!model) {
      setModelError('Введите данные')
      setInvalidModel('error')
    }
    if (!type) {
      setTypeError('Введите данные')
      setInvalidType('error')
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

            <InputFile getFile={setFile} />
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
                textError={modelError}
              />
              <InputStandart
                value={type}
                onChange={setType}
                label="Тип автомобиля"
                placeholder="Введите тип"
                type="text"
                status={invalidErrorType}
                textError={typeError}
              />
            </div>
            <GetColorCar />
          </div>
          <div className="options-block__buttons-block">
            <div className="options-block__neighboring-button">
              <BigButton text="Сохранить" onClick={getCarOptionsHandler} />
              <BigButton
                text="Отменить"
                // disabled={disabled}
              />
            </div>
            <BigButton delite="delite" text="Удалить" />
          </div>
        </div>
      </form>
    </>
  )
}
