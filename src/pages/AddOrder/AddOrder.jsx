import './addOrder.scss'
import { useSelector } from 'react-redux'

export const AddOrder = ({ responseData }) => {
  const dataCar = useSelector((state) => state.order.carArray)
  const dateD = new Date(useSelector((state) => state.order.dataId.dateFrom))

  const hour = dateD.getHours()
  const minute = dateD.getMinutes()
  const day = dateD.toLocaleDateString()
  const numberCar = () => {
    const reg = /\d{1,}/g
    return responseData
      ? responseData.data.carId.number.replace(reg, ` $& `)
      : dataCar.number.replace(reg, ` $& `)
  }
  return (
    <section className="order-page__order">
      <div className="add-order">
        <div className="add-order__data">
          {responseData ? (
            <p className="add-order__title"> Ваш заказ подтверждён</p>
          ) : (
            ''
          )}
          <p className="text-name">{dataCar.name}</p>
          <span className="add-order__reg-number">{numberCar()}</span>
          <p className="add-order__row bold-text">
            Доступна c
            <span className="text">{`${day} ${hour < 10 ? '0' + hour : hour}:${
              minute < 10 ? '0' + minute : minute
            }`}</span>
          </p>
        </div>
        <img
          className="add-order__pic"
          src={
            responseData
              ? responseData.data.carId.thumbnail.path
              : dataCar.thumbnail.path
          }
          alt={responseData ? responseData.data.carId.name : dataCar.name}
        />
      </div>
    </section>
  )
}
