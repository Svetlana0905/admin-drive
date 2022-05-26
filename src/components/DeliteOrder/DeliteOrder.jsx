import './deliteOrder.scss'
import { useDeleteOrderDataMutation } from '../../redux'
import { useState } from 'react'

export const DeliteOrder = ({ orderId, isVisible, setIsVisibleDelite }) => {
  const [orderDelite] = useDeleteOrderDataMutation()
  const [responseDelete, setResponseDelete] = useState(false)

  const deliteOrder = async (e) => {
    await orderDelite({ orderId }).unwrap()
    setResponseDelete(true)
    setTimeout(() => {
      setIsVisibleDelite(!isVisible)
    }, 2000)
  }
  return (
    <section className={isVisible ? 'delete-block' : 'delete-block__hidden'}>
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
          onClick={deliteOrder}
          className="button button__small button__delite">
          Удалить
        </button>
        <button
          onClick={() => setIsVisibleDelite(!isVisible)}
          className="button button__small">
          Отмена
        </button>
      </div>
    </section>
  )
}
