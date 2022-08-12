import { InputStandart } from '../../components/LoginInput/LoginInput'
import { ListDropdown } from '../../components/ListDropdown/ListDropdown'
import { useEffect } from 'react'

export const ModalPoint = ({
  props,
  setCityInput,
  cityInput,
  cityArr,
  errorMassage,
  isDisabledModal,
  setErrorMassage
}) => {
  useEffect(() => {
    setCityInput(props?.item?.cityId ? props.item.cityId.name : '')
  }, [props.item, setCityInput])

  const closeModal = () => {
    if (props.text === 'Изменить') {
      props.setIsVisibleModal(false)
      props.setPointName('')
      props.setPointAddress('')
      setErrorMassage('')
    }
    if (props.text === 'Добавить') {
      props.setPointName('')
      props.setPointAddress('')
      props.setIsVisibleModal(false)
      setErrorMassage('')
    }
  }
  const clearCityInput = () => {
    setCityInput('')
  }

  return (
    <section
      className={props.isVisibleModal ? 'modal-block' : 'modal-block__hidden'}>
      <div className="modal-block__column">
        <p className="modal-block__text-link text-link">
          {props.text} точку <br />
          <span className="text-green">
            {props.item.cityId ? props.item.cityId.name : ''}
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
            setInputText={setCityInput}
            textInput={cityInput}
            data={cityArr}
            textSpan="Город"
            placeholder="Выберите город"
            disabled={!cityArr}
            clearInput={clearCityInput}
          />
        </div>

        <InputStandart
          label="Название точки"
          value={props.pointName}
          onChange={props.setPointName}
          type="text"
          placeholder={
            props.text === 'Изменить' && props.item ? props.item.name : ''
          }
        />
        <InputStandart
          label="Адрес"
          value={props.pointAddress}
          onChange={props.setPointAddress}
          type="text"
          placeholder={
            props.text === 'Изменить' && props.item ? props.item.address : ''
          }
        />
        <div className="modal-block__btn-block">
          <button
            onClick={props.actions}
            className={
              isDisabledModal
                ? 'button button__small green-btn hidden'
                : 'button button__small green-btn '
            }
            disabled={isDisabledModal}>
            {props.text === 'Изменить' ? 'Изменить' : 'Добавить'}
          </button>
          <button onClick={closeModal} className="button button__small">
            {isDisabledModal ? 'Закрыть' : 'Отменить'}
          </button>
        </div>
      </div>
    </section>
  )
}
