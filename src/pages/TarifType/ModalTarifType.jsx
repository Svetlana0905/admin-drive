import { InputStandart } from '../../components/LoginInput/LoginInput'

export const ModalTarifType = ({
  props,
  tarifUnit,
  setTarifUnit,
  isDisabledModal,
  tarifName,
  setTarifName,
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
        <p className="modal-block__text-link text-link">
          {props.text} тариф <br />
          <span className="text-green">{tarifName}</span>
          {tarifUnit}
        </p>
        <p
          className={
            errorMessage ? 'modal-block__error' : 'modal-block__error-hidden'
          }>
          Поле не должно быть пустым
        </p>
        <InputStandart
          label="Название"
          value={tarifName}
          onChange={setTarifName}
          placeholder={tarifName}
          type="text"
        />
        <InputStandart
          label="Срок"
          value={tarifUnit}
          onChange={setTarifUnit}
          placeholder={tarifUnit}
          type="text"
        />
        <div className="modal-block__btn-block">
          <button
            onClick={props.actions}
            className={
              isDisabledModal
                ? 'button button__small green-btn hidden'
                : 'button button__small green-btn'
            }>
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
