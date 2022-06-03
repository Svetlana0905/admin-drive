import { InputStandart } from '../../components/LoginInput/LoginInput'
export const ModalCity = ({
  isVisibleModal,
  closeModal,
  actions,
  text,
  cityName,
  setCityName,
  isDisabledModal,
  errorMassage
}) => {
  return (
    <section className={isVisibleModal ? 'modal-block' : 'modal-block__hidden'}>
      <div className="modal-block__column">
        <p className="text-link"> {text} город</p>
        <p
          className={
            errorMassage ? 'modal-block__error' : 'modal-block__error-hidden'
          }>
          Поле не должно быть пустым
        </p>
        <InputStandart
          value={cityName}
          onChange={setCityName}
          placeholder={text === 'Изменить' ? cityName : 'Введите город'}
          type="text"
        />
        <div className="modal-block__btn-block">
          <button
            onClick={actions}
            className="button button__small green-btn"
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
