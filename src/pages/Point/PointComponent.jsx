import { ListButton } from '../../components/Button/Button'

export const PointComponent = ({ item, changePoint, deletePoint }) => {
  return (
    <>
      <div key={item.id} className="content__row content__row-point">
        <p className="content__item">
          <span className="content__item-span">{item.name}</span>
          <span className="content__item-span">{item.address}</span>
        </p>
        <p className="content__item">
          {item.cityId ? item.cityId.name : 'Нет города'}
        </p>
        <div className="buttons-group">
          <ListButton text="Изменить" clickHandler={(e) => changePoint(item)} />
          <ListButton text="Удалить" clickHandler={(e) => deletePoint(item)} />
        </div>
      </div>
    </>
  )
}
