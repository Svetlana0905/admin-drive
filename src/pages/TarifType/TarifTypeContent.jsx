import { ListButton } from '../../components/Button/Button'

export const TarifTypeContent = ({
  dataSource,
  isVisibleDelete,
  isVisibleModal,
  changeTarif,
  tarifDelete
}) => {
  return (
    <>
      {dataSource?.length ? (
        <div className="list-block__column">
          {dataSource.map((item, id) => (
            <div className="list-block__row" key={id}>
              <p className="list-block__inner-tarif text-bold">
                <span>{item.name ? item.name : 'Нет названия'}</span>
                <span className="text-light">
                  ({item.unit ? item.unit : 'Нет названия'})
                </span>
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
    </>
  )
}
