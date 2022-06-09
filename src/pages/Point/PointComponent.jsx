import './point.scss'
import { ListButton } from '../../components/Button/Button'

export const PointComponent = ({ item, changePoint, deletePoint }) => {
  return (
    <div key={item.id} className="point">
      <div className="point__address">
        <div className="point__span-block">
          <span className="point__item-span text-light">{item.name},</span>
          <span className="point__item-span">{item.address}</span>
        </div>
        <p className="point__city">
          {item.cityId ? item.cityId.name : 'Нет города'}
        </p>
      </div>

      <div className="point__btn-group">
        <ListButton text="Изменить" clickHandler={(e) => changePoint(item)} />
        <ListButton text="Удалить" clickHandler={(e) => deletePoint(item)} />
      </div>
    </div>
  )
}
