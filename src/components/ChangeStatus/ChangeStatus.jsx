import { useChangeOrderStatusMutation } from '../../redux'
import { useEffect, useState } from 'react'

export const ChangeStatus = ({
  orderItem,
  isVisibleStatusOrder,
  setIsVisibleStatusOrder
}) => {
  const [changeStatusOrder] = useChangeOrderStatusMutation()
  const [responseStatus, setResponseStatus] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const changeStatus = async (e) => {
    const id = orderItem.id
    const data = { ...orderItem }
    data.orderStatusId = {
      name: 'Подтвержденные',
      id: '5e26a1f0099b810b946c5d8b'
    }
    setIsDisabled(true)
    setResponseStatus(true)
    await changeStatusOrder({ id, data }).unwrap()
    setTimeout(() => {
      setIsVisibleStatusOrder(!isVisibleStatusOrder)
      setResponseStatus(false)
      setShowMessage(false)
    }, 2000)
  }

  useEffect(() => {
    if (
      orderItem.orderStatusId &&
      orderItem.orderStatusId.name === 'Подтвержденные'
    ) {
      setShowMessage(true)
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
      setShowMessage(false)
    }
  }, [orderItem, showMessage])

  return (
    <section
      className={
        isVisibleStatusOrder ? 'delete-block' : 'delete-block__hidden'
      }>
      <div
        className={
          responseStatus ? 'delete-response' : 'delete-response__hidden'
        }>
        Статус изменен на Подтвержденный
      </div>

      <div
        className={showMessage ? 'delete-response' : 'delete-response__hidden'}>
        Нельзя изменить этот статус на Подтвержденный
      </div>
      {showMessage ? (
        ''
      ) : (
        <div
          className={
            responseStatus ? 'delete-block__hidden' : 'delete-block__body'
          }>
          <p className="text-bold">Изменить статус заказа</p>

          {orderItem.orderStatusId ? (
            <p>
              <span>c</span>
              <br />
              <span className="text-dark">{orderItem.orderStatusId.name}</span>
              <br />
              <span>на</span>
              <br />
              <span className="text-dark">Подтвержденный?</span>
            </p>
          ) : (
            <span className="text-dark">
              <span>на</span>
              <br /> Подтвержденный?
            </span>
          )}
        </div>
      )}

      <div className="delete-block__btn-block">
        <button
          onClick={changeStatus}
          className={
            isDisabled
              ? 'button button__small green-btn hidden'
              : 'button button__small green-btn '
          }>
          Изменить
        </button>
        <button
          onClick={() => {
            setIsVisibleStatusOrder(!isVisibleStatusOrder)
            setShowMessage(showMessage)
          }}
          className="button button__small">
          Закрыть
        </button>
      </div>
    </section>
  )
}
