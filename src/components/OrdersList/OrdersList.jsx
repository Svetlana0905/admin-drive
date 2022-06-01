import stub from '../../assets/stub.jpg'
import { Checkbox } from '../../components/Button/Button'
import { getDate } from '../../components/GetDate/GetDate'

export const OrdersList = ({
  data,
  orderDelete,
  orderChange,
  orderChangeStatus
}) => {
  return (
    <>
      {data?.data?.length ? (
        data.data.map((item) => (
          <div key={item.id} className="content__row">
            <div className="content__description">
              <p className="content__img-inner">
                {item.carId ? (
                  <img
                    src={item.carId.thumbnail.path}
                    className="content__car-pic"
                    alt={item.name}
                  />
                ) : (
                  <img
                    src={stub}
                    className="content__car-pic"
                    alt={item.name}
                  />
                )}
              </p>
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
            </div>
            <div className="content__options">
              <Checkbox
                text={'Детское кресло'}
                checked={item.isNeedChildChair}
                readonly
              />
              <Checkbox
                text={'Правый руль'}
                checked={item.isRightWheel}
                readonly
              />
              <Checkbox
                text={'Полный бак'}
                checked={item.isFullTank}
                readonly
              />
            </div>
            <p className="content__price">
              {item.price ? item.price : 0}
              <span className="content__price"> ₽</span>
            </p>
            <div className="buttons-group">
              <button
                disabled={!item.carId || !item.cityId || !item.price}
                className="buttons-group__btn change"
                onClick={() => orderChangeStatus(item)}>
                {!item.carId || !item.cityId || !item.price ? (
                  <span className="tooltip">
                    Нельзя изменить статус заказа если не заполнены поля Машина,
                    Адрес, Цена
                  </span>
                ) : (
                  <span className="tooltip__hidden"></span>
                )}
                Готово
              </button>
              <button
                className="buttons-group__btn cancel"
                onClick={(e) => orderDelete(item.id)}>
                Удалить
              </button>
              <button
                className="buttons-group__btn change"
                onClick={() => orderChange(item)}>
                Изменить
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="content__row">Записи не найдены</div>
      )}
    </>
  )
}
