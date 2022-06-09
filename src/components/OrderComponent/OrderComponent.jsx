import { OrderContentColumn } from '../OrderContentColumn/OrderContentColumn'
import { CarImageBlock } from '../CarImageBlock/CarImageBlock'
import { CheckBoxReadOnly } from '../CheckBoxReadOnlyBlock/CheckBoxReadOnly'

export const OrderComponent = ({
  orderDelete,
  item,
  orderChange,
  orderChangeStatus
}) => {
  return (
    <div key={item.id} className="content__row">
      <div className="content__description">
        <CarImageBlock item={item} />
        <OrderContentColumn item={item} />
      </div>
      <CheckBoxReadOnly item={item} />
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
  )
}
