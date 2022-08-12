import { Pagination, Image } from 'antd'
import { ListButton, ItemRender } from '../../components/Button/Button'
import stub from '../../assets/stub.jpg'

export const CarComponent = ({
  car,
  page,
  setPage,
  totalPage,
  pageSise,
  deleteCar,
  changeCar
}) => {
  const numberCar = (carNumber) => {
    const reg = /\d{1,}/g
    return carNumber.replace(reg, ` $& `)
  }

  return (
    <>
      {car ? (
        <>
          {car.data.map((item) => (
            <div key={item.id} className="car__row">
              <div className="car__half">
                <div className="car__item-list">
                  {item.thumbnail ? (
                    <div>
                      <Image width={80} src={item.thumbnail.path} />
                    </div>
                  ) : (
                    <img
                      src={stub}
                      className="content__car-pic"
                      alt={item.name}
                    />
                  )}
                </div>
                <p className="list-block__text car__item-list">{item.name}</p>
                <div className="car__number car__number-small car__item-list">
                  {numberCar(item.number ? numberCar(item.number) : 'Номер')}
                </div>
                <p className="car__text car__item-list">
                  {item.categoryId ? item.categoryId.name : 'Нет данных'}
                </p>
              </div>
              <div className="car__half">
                <div className="car__text car__item-list">
                  <p className="content__price content__price-min">
                    {item.priceMin}{' '}
                    <span className="content__price content__price-min">₽</span>
                  </p>
                  <p className="content__price content__price-min">
                    {item.priceMax}
                    <span className="content__price content__price-min">
                      {' '}
                      ₽
                    </span>
                  </p>
                </div>
                <p className="car__text car__item-list">
                  {item.description ? item.description : 'Нет данных'}
                </p>
                <div className="car__text car__text-column car__item-list">
                  {item.colors
                    ? item.colors.map((item, id) => (
                        <span key={id}> {item}</span>
                      ))
                    : 'Нет данных'}
                </div>
                <div className="buttons-group">
                  <ListButton
                    text="Изменить"
                    clickHandler={(e) => changeCar(item)}
                  />
                  <ListButton
                    text="Удалить"
                    clickHandler={(e) => deleteCar(item)}
                  />
                </div>
              </div>
            </div>
          ))}
          <Pagination
            showSizeChanger={false}
            current={page + 1}
            total={totalPage}
            pageSize={pageSise}
            onChange={(e) => setPage(e - 1)}
            itemRender={ItemRender}
          />
        </>
      ) : (
        ''
      )}
    </>
  )
}
