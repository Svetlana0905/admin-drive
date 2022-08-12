import { InputNumber } from 'antd'
import { ListDropdown } from '../../components/ListDropdown/ListDropdown'

export const ModalTarif = ({
  props,
  isDisabledModal,
  tarifPriceNumber,
  setTarifPriceNumber,
  errorMessage,
  setInputTarifType,
  inputTarifType
}) => {
  const closeModal = () => {
    if (props.text === 'Изменить') {
      props.setIsVisibleModal(false)
      setTarifPriceNumber(0)
    }
    if (props.text === 'Добавить') {
      setTarifPriceNumber(0)
      props.setIsVisibleModal(false)
    }
  }

  return (
    <section
      className={props.isVisibleModal ? 'modal-block' : 'modal-block__hidden'}>
      <div className="modal-block__column">
        <p className="modal-block__text-link text-link">
          {props.text} тариф <br />
          <span className="text-green">
            {props.item?.rateTypeId ? props.item.rateTypeId.name : ''}
          </span>
          <br />
          {props.item?.rateTypeId ? props.item.rateTypeId.unit : ''}
        </p>
        <p
          className={
            errorMessage ? 'modal-block__error' : 'modal-block__error-hidden'
          }>
          Поле не должно быть пустым
        </p>
        {props.text === 'Добавить' ? (
          <>
            <div className="modal-block__listdd">
              <ListDropdown
                setInputText={setInputTarifType}
                textInput={inputTarifType}
                data={props.tarifNameArr}
                placeholder="Выберите тариф"
                disabled={!props.tarifNameArr}
                textSpan="Тариф"
                clearInput={() => setInputTarifType('')}
              />
            </div>
          </>
        ) : (
          ''
        )}
        <label className="label__tarif label">
          <span className="label__span">Цена</span>
          <InputNumber
            value={tarifPriceNumber}
            onChange={setTarifPriceNumber}
            type="number"
            defaultValue={props.item?.price ? props.item.price : 0}
            className="ant-input-number-tarif"
          />
        </label>
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
