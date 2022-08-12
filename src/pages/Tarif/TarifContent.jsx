import { ListButton } from '../../components/Button/Button'
export const TarifContent = ({ dataSource, changeTarif, tarifDelete }) => {
  return (
    <div className="content">
      {dataSource?.length ? (
        <div className="list-block__column">
          {dataSource.map((item, id) => (
            <div className="list-block__row" key={id}>
              <p className="list-block__inner-tarif text-bold">
                <span>
                  {item.rateTypeId ? item.rateTypeId.name : 'Нет названия'}
                </span>
                <span className="text-light">
                  ({item.rateTypeId ? item.rateTypeId.unit : 'Нет названия'})
                </span>
              </p>
              <p className="list-block__text-tarif">
                {item.price ? `${item.price} ₽` : 0}
              </p>
              <div className="buttons-group">
                <ListButton
                  text="Изменить"
                  clickHandler={(e) => changeTarif(item)}
                />
                <ListButton
                  text="Удалить"
                  clickHandler={(e) => tarifDelete(item)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
