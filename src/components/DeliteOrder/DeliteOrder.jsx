import './deliteOrder.scss'
import { useDeleteOrderDataMutation } from '../../redux'

export const DeliteOrder = ({ orderId, isVisible, setIsVisibleDelite }) => {
  const [orderDelite, { isError }] = useDeleteOrderDataMutation()

  const deliteOrder = async (e) => {
    await orderDelite({}).unwrap()
    console.log(isError)
  }
  return (
    <section className={isVisible ? 'delite-block' : 'delite-block__hidden'}>
      <p className="text-link">Вы действительно хотите удалить заказ №</p>
      <span className="text-dark">{orderId}</span>
      <div className="delite-block__btn-block">
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
