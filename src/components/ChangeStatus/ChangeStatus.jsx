import { useChangeOrderStatusMutation } from '../../redux'
import { useEffect, useState } from 'react'

export const ChangeStatus = ({
  orderItem,
  isVisibleStatusOrder,
  setIsVisibleStatusOrder
}) => {
  const [changeStatusOrder, { data }] = useChangeOrderStatusMutation()
  const [responseStatus, setResponseStatus] = useState(false)

  const changeStatus = async (e) => {
    const id = orderItem.id
    const data = { ...orderItem }
    if (
      orderItem.orderStatusId.name !== 'Подтвержденные' &&
      orderItem.orderStatusId.name !== 'Завершенные'
    )
      data.orderStatusId = {
        name: 'Подтвержденные',
        id: '5e26a1f0099b810b946c5d8b'
      }
    console.log(data)
    await changeStatusOrder({ id, data }).unwrap()
    setResponseStatus(data)
    setTimeout(() => {
      setIsVisibleStatusOrder(!isVisibleStatusOrder)
      setResponseStatus(false)
    }, 2000)
  }
  useEffect(() => {
    console.log(data)
  }, [data])

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
      <div className="delete-block__btn-block">
        <button
          onClick={changeStatus}
          className="button button__small button__delite">
          Изменить
        </button>
        <button
          onClick={() => setIsVisibleStatusOrder(!isVisibleStatusOrder)}
          className="button button__small">
          {responseStatus ? 'Закрыть' : 'Отменить'}
        </button>
      </div>
    </section>
  )
}
