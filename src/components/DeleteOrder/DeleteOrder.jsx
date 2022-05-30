import './deliteOrder.scss'
import { useDeleteOrderDataMutation } from '../../redux'
import { useState } from 'react'

export const DeleteOrder = ({
  orderId,
  isVisibleDelete,
  setIsVisibleDelete
}) => {
  const [orderDelete] = useDeleteOrderDataMutation()
  const [responseDelete, setResponseDelete] = useState(false)

  const deleteOrder = async (e) => {
    await orderDelete({ orderId }).unwrap()
    setResponseDelete(true)
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
      setResponseDelete(false)
    }, 2000)
  }
  return (
    <section
      className={isVisibleDelete ? 'delete-block' : 'delete-block__hidden'}>
      <div
        className={
          responseDelete ? 'delete-response' : 'delete-response__hidden'
        }>
        Заказ был удален
      </div>
      <div
        className={
          responseDelete ? 'delete-block__hidden' : 'delete-block__body'
        }>
        <p className="text-link">Вы действительно хотите удалить заказ №</p>
        <span className="text-dark">{orderId}</span>
      </div>
      <div className="delete-block__btn-block">
        <button
          onClick={deleteOrder}
          className="button button__small button__delite">
          Удалить
        </button>
        <button
          onClick={() => setIsVisibleDelete(!isVisibleDelete)}
          className="button button__small">
          {responseDelete ? 'Закрыть' : 'Отменить'}
        </button>
      </div>
    </section>
  )
}
