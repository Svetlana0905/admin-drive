import { InputStandart } from '../../components/LoginInput/LoginInput'
import { useGetTarifTypeQuery } from '../../redux'
import { ListDropdown } from '../../components/ListDropdown/ListDropdown'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'

export const ModalTarif = ({
  isVisibleModal,
  closeModal,
  actions,
  text,
  isDisabledModal,
  tarifPrice,
  setTarifPrice,
  errorMassage,
  setTarifRate,
  errorNumber,
  item
}) => {
  const [textInput, setInputText] = useState('')
  let dataSource = []
  const {
    data = [],
    isLoading,
    isSuccess
  } = useGetTarifTypeQuery({ page: 0, limit: 0 })
  useEffect(() => {
    if (textInput) {
      setTarifRate(
        data.data.filter((item) => item.name && item.name === textInput)
      )
    }
  }, [textInput, setTarifRate, data.data])

  if (isLoading) return <Spin tip="Loading..." size="large" />
  if (isSuccess) {
    dataSource = data.data.map((item) => item.name)
  }
  return (
    <section className={isVisibleModal ? 'modal-block' : 'modal-block__hidden'}>
      <div className="modal-block__column">
        <p className="modal-block__text-link text-link">
          {text} тариф <br />
          <span className="text-green">
            {item.rateTypeId ? item.rateTypeId.name : ''}
          </span>
          <br />
          {item.rateTypeId ? item.rateTypeId.unit : ''}
        </p>
        <p
          className={
            errorMassage ? 'modal-block__error' : 'modal-block__error-hidden'
          }>
          Поле не должно быть пустым
        </p>
        {text === 'Добавить' ? (
          <>
            <div className="modal-block__listdd">
              <ListDropdown
                setInputText={setInputText}
                textInput={textInput}
                data={dataSource}
                placeholder="Выберите тариф"
                disabled={!dataSource}
                textSpan="Тариф"
                clearInput={() => setInputText('')}
              />
            </div>
          </>
        ) : (
          ''
        )}
        <p
          className={
            errorNumber ? 'modal-block__error' : 'modal-block__error-hidden'
          }>
          Должно быть число
        </p>
        <InputStandart
          label="Цена"
          value={tarifPrice}
          onChange={setTarifPrice}
          placeholder={tarifPrice}
          type="text"
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
