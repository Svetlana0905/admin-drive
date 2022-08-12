import { InputStandart } from '../../components/LoginInput/LoginInput'
export const ModalCity = ({
  props,
  setCityName,
  cityName,
  isDisabledModal,
  errorMessage
}) => {
  const closeModal = () => {
    if (props.text === 'Изменить') props.setIsVisibleModal(false)
    if (props.text === 'Добавить') props.setIsVisibleModal(false)
  }
  return (
    <section
      className={props.isVisibleModal ? 'modal-block' : 'modal-block__hidden'}>
      <div className="modal-block__column">
        <p className="text-link"> {props.text} город</p>
        <p
          className={
            errorMessage ? 'modal-block__error' : 'modal-block__error-hidden'
          }>
          Поле не должно быть пустым
        </p>
        <InputStandart
          value={cityName}
          onChange={setCityName}
          placeholder={props.text === 'Изменить' ? cityName : 'Введите город'}
          type="text"
        />
        <div className="modal-block__btn-block">
          <button
            onClick={props.actions}
            className={
              isDisabledModal
                ? 'button button__small green-btn hidden'
                : 'button button__small green-btn'
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
