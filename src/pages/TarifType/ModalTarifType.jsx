import { InputStandart } from '../../components/LoginInput/LoginInput'

export const ModalTarifType = ({
  isVisibleModal,
  closeModal,
  actions,
  text,
  isDisabledModal,
  tarifName,
  setTarifName,
  tarifUnit,
  setTarifUnit,
  errorMassage
}) => {
  return (
    <section className={isVisibleModal ? 'modal-block' : 'modal-block__hidden'}>
      <div className="modal-block__column">
        <p className="modal-block__text-link text-link">
          {text} тариф <br />
          <span className="text-green">{tarifName}</span>
          {tarifUnit}
        </p>
        <p
          className={
            errorMassage ? 'modal-block__error' : 'modal-block__error-hidden'
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
            onClick={actions}
            className={
              isDisabledModal
                ? 'button button__small green-btn hidden'
                : 'button button__small green-btn'
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
