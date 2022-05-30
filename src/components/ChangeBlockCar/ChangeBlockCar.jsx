import stub from '../../assets/stub.jpg'
import { useGetCarQuery } from '../../redux/'
import { getCarId } from '../../redux/OrdersSlice'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ListDropdown } from '../ListDropdown/ListDropdown'
import { Spin } from 'antd'

export const ChangeBlockCar = ({ orderItem }) => {
  const dispatch = useDispatch()
  const [carInput, setCarInput] = useState('')
  const [carPath, setCarPath] = useState('')

  let carArr = []

  const {
    data: car = [],
    isSuccess: carSuccess,
    isLoading: loadingCar
  } = useGetCarQuery()

  useEffect(() => {
    setCarPath(orderItem.carId ? orderItem.carId.thumbnail.path : '')
  }, [orderItem, dispatch])

  useEffect(() => {
    let carItem = {}
    if (carInput && car) {
      carItem = car.data.filter((item) => item.name && item.name === carInput)
      if (carItem[0]) {
        setCarPath(carItem[0].thumbnail.path)
        dispatch(getCarId(carItem[0]))
      } else {
        setCarPath(stub)
        dispatch(getCarId({}))
      }
    }
  }, [carInput, car, dispatch])
  if (loadingCar)
    return (
      <div className="loading-block">
        <p>Идет загрузка данных для машины</p> <Spin />
      </div>
    )

  if (carSuccess) {
    carArr = car.data.reduce((accum, item) => {
      return accum.includes(item.name) ? accum : [...accum, item.name]
    }, [])
  }
  return (
    <>
      <div className="change-block__car">
        <div className="change-block__wrapper-input">
          <ListDropdown
            textSpan="Машина"
            setInputText={setCarInput}
            textInput={carInput}
            data={carArr}
            placeholder={orderItem.carId ? orderItem.carId.name : ''}
          />
        </div>
        <p className="content__img-inner">
          {carPath ? (
            <img src={carPath} className="content__car-pic" alt={''} />
          ) : (
            <img src={stub} className="content__car-pic" alt={orderItem.name} />
          )}
        </p>
      </div>
    </>
  )
}
