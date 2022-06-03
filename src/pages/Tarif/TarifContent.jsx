import { ListButton } from '../../components/Button/Button'
export const TarifContent = ({
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
            <div
              className={
                isVisibleDelete || isVisibleModal
                  ? 'list-block__dark'
                  : 'list-block__row'
              }
              key={id}>
              <p className="list-block__text-tarif text-bold">
                {item.rateTypeId ? item.rateTypeId.name : 'Нет названия'}
                <br /> (
                {item.rateTypeId ? item.rateTypeId.unit : 'Нет названия'})
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
    </>
  )
}
