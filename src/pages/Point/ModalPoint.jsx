import { InputStandart } from '../../components/LoginInput/LoginInput'
import { ListDropdown } from '../../components/ListDropdown/ListDropdown'
import { useState, useEffect } from 'react'

export const ModalPoint = ({
  isVisibleModal,
  closeModal,
  actions,
  text,
  isDisabledModal,
  errorMassage,
  pointName,
  setPointName,
  setCityObj,
  cityArr,
  item,
  setPointAddress,
  pointAddress,
  city
}) => {
  const [textInput, setInputText] = useState('')
  useEffect(() => {
    setInputText(item.cityId ? item.cityId.name : '')
  }, [item])
  const clearCityInput = () => {
    setPointAddress('')
    setPointName('')
    setInputText('')
  }
  useEffect(() => {
    if (textInput) {
      setCityObj(
        city.data.filter((item) => item.name && item.name === textInput)
      )
    }
  }, [textInput, setCityObj, city])
  return (
    <section className={isVisibleModal ? 'modal-block' : 'modal-block__hidden'}>
      <div className="modal-block__column">
        <p className="modal-block__text-link text-link">
          {text} точку <br />
          <span className="text-green">
            {item.cityId ? item.cityId.name : ''}
          </span>
        </p>
        <p
          className={
            errorMassage ? 'modal-block__error' : 'modal-block__error-hidden'
          }>
          Поля не должны быть пустыми
        </p>
        <div className="modal-block__listdd">
          <ListDropdown
            setInputText={setInputText}
            textInput={textInput}
            data={cityArr}
            textSpan="Город"
            placeholder="Выберите город"
            disabled={!cityArr}
            clearInput={clearCityInput}
          />
        </div>

        <InputStandart
          label="Название точки"
          value={pointName}
          onChange={setPointName}
          type="text"
          placeholder={item ? item.name : ''}
        />
        <InputStandart
          label="Адрес"
          value={pointAddress}
          onChange={setPointAddress}
          type="text"
          placeholder={item ? item.address : ''}
        />
        <div className="modal-block__btn-block">
          <button
            onClick={actions}
            className={
              isDisabledModal
                ? 'button button__small green-btn hidden'
                : 'button button__small green-btn '
            }
            disabled={isDisabledModal}>
            {text === 'Изменить' ? 'Изменить' : 'Добавить'}
          </button>
          <button onClick={closeModal} className="button button__small">
            {isDisabledModal ? 'Закрыть' : 'Отменить'}
          </button>
        </div>
      </div>
    </section>
  )
}
