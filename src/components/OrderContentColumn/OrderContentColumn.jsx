import { getDate } from '../../components/GetDate/GetDate'

export const OrderContentColumn = ({ item }) => {
  return (
    <div className="content__column">
      <p className="text-dark">
        {item.carId ? item.carId.name : 'Авто не указан'}
        <span className="text-light"> в </span>
        <span className="text-dark">
          {item.cityId ? item.cityId.name : 'не указан'}
        </span>
        <span className="text-light">
          , {item.pointId ? item.pointId.address : 'не указан'}
        </span>
      </p>
      <p className="text-light">
        {getDate(item.dateFrom)} - {getDate(item.dateTo)}
      </p>
      <p className="text-dark">
        <span className="text-light">Цвет </span> {item.color}
      </p>
      <p className="text-dark">
        <span className="text-light">Статус </span>
        {item.orderStatusId ? item.orderStatusId.name : 'не указан'}
      </p>
    </div>
  )
}
