import './changeOrder.scss'
import {
  useGetCityQuery,
  useGetStatusQuery,
  useGetPointQuery,
  useChangeOrderMutation
} from '../../redux/'
import {
  getOrder,
  getCityId,
  getPointId,
  getStatusId,
  getChildChairId,
  getRightWhelId,
  getFullTankId
} from '../../redux/OrdersSlice'
import { getPointsData } from '../../redux/PointsSlice'
import { getStatusAlert } from '../../redux/alertSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ListDropdown } from '../ListDropdown/ListDropdown'
import { useState, useEffect, useMemo } from 'react'
import { Checkbox } from '../Button/Button'
import { ChangeBlockCar } from '../ChangeBlockCar/ChangeBlockCar'
import { ChangeDateBlock } from '../ChangeDateBlock/ChangeDateBlock'

export const ChangeOrder = ({
  orderItem,
  isVisibleChange,
  setIsVisibleChange
}) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.orders.order)
  const { data: city = [], isSuccess: citySuccess } = useGetCityQuery({
    page: 0,
    limit: 0
  })
  const { data: status = [], isSuccess: statusSuccess } = useGetStatusQuery()
  const { data: point = [] } = useGetPointQuery({ page: 0, limit: 0 })
  const [orderChange, { isError }] = useChangeOrderMutation()

  const [cityInput, setCityInput] = useState('')
  const [statusInput, setStatusInput] = useState('')
  const [pointInput, setPointInput] = useState('')
  const [placeholderPoint, setPlaceholderPoint] = useState()
  const [tank, setTank] = useState()
  const [childChair, setChildChair] = useState()
  const [rightWheell, setRightWheell] = useState()
  const [errorMessage, setErrormessage] = useState(false)
  const [isDisabledBtn, setIsDisabledBtn] = useState(false)

  let cityArr = []
  let statusArr = []
  let pointArr = []

  useEffect(() => {
    setTank(orderItem.isFullTank ? orderItem.isFullTank : false)
    setChildChair(
      orderItem.isNeedChildChair ? orderItem.isNeedChildChair : false
    )
    setRightWheell(orderItem.isRightWheel ? orderItem.isRightWheel : false)
    setPlaceholderPoint(orderItem.pointId ? orderItem.pointId.address : '')
    dispatch(getOrder(orderItem))
  }, [orderItem, dispatch])

  useEffect(() => {
    let itemStatus = {}
    if (statusInput) {
      itemStatus = status.data.filter(
        (item) => item.name && item.name === statusInput
      )
      dispatch(getStatusId(itemStatus[0]))
    }
  }, [statusInput, status, dispatch])

  useEffect(() => {
    let itemPoint = {}
    if (pointInput) {
      itemPoint = point.data.filter(
        (item) => item.name && item.name === pointInput
      )
      dispatch(getPointId(itemPoint[0]))
    }
  }, [pointInput, point, dispatch])

  useEffect(() => {
    dispatch(getPointsData(point.data))
  }, [point, dispatch])

  useEffect(() => {
    let itemCity = {}
    setPlaceholderPoint('')
    setPointInput('')
    if (cityInput) {
      itemCity = city.data.filter(
        (item) => item.name && item.name === cityInput
      )
      dispatch(getPointId(null))
      dispatch(getCityId(itemCity[0]))
    }
  }, [cityInput, city, dispatch])

  pointArr = useMemo(() => {
    let pointAr = []
    if (cityInput) {
      pointAr = point.data.filter(
        (item) => item.cityId && item.cityId.name === cityInput
      )
      return pointAr
    }
    if (orderItem.cityId) {
      pointAr = point.data.filter(
        (item) => item.cityId && item.cityId.name === orderItem.cityId.name
      )
      return pointAr
    }
  }, [cityInput, point.data, orderItem.cityId])

  if (citySuccess) {
    cityArr = city.data.reduce((accum, item) => {
      return accum.includes(item.name) ? accum : [...accum, item.name]
    }, [])
  }
  if (statusSuccess) {
    statusArr = status.data.map((item) => item.name)
  }

  const clearItems = () => {
    setCityInput('')
    setStatusInput('')
    setPointInput('')
    setTank(false)
    setRightWheell(false)
    setChildChair(false)
  }
  const close = () => {
    setIsVisibleChange(!isVisibleChange)
    clearItems()
    setErrormessage(false)
    setIsDisabledBtn(false)
  }
  const changeOrder = async (e) => {
    const id = orderItem.id
    await orderChange({ id, data }).unwrap()
    setIsDisabledBtn(true)
    setTimeout(() => {
      dispatch(getStatusAlert('Заказ был успешно сохранен!'))
      setErrormessage(false)
    }, 2000)
  }
  useEffect(() => {
    if (isError) {
      setErrormessage(true)
      setIsDisabledBtn(false)
    }
  }, [isError])

  return (
    <section
      className={isVisibleChange ? 'change-block' : 'change-block__hidden'}>
      <div className="">
        <p className="text-link">Изменить заказ</p>
      </div>
      <div
        className={
          errorMessage ? 'change-block__error' : 'change-block__hidden'
        }>
        <p className="text-error">
          Произошла ошибка. Поля Машина, Город, Адрес должны быть заполнены
        </p>
      </div>
      <p className="content__price">{orderItem.price} ₽</p>
      <div className="change-block__inner">
        <div className="change-block__wrapper-input">
          <ListDropdown
            textSpan="Город"
            setInputText={setCityInput}
            textInput={cityInput}
            data={cityArr}
            placeholder={orderItem.cityId ? orderItem.cityId.name : ''}
          />
        </div>
        <div className="change-block__wrapper-input">
          <ListDropdown
            textSpan="Пункт выдачи"
            name="point"
            setInputText={setPointInput}
            textInput={pointInput}
            data={pointArr}
            placeholder={placeholderPoint}
          />
        </div>
        <div className="change-block__wrapper-input">
          <ListDropdown
            textSpan="Статус заказа"
            setInputText={setStatusInput}
            textInput={statusInput}
            data={statusArr}
            placeholder={
              orderItem.orderStatusId ? orderItem.orderStatusId.name : ''
            }
          />
        </div>
      </div>
      <ChangeBlockCar orderItem={orderItem} />
      <ChangeDateBlock orderItem={orderItem} />
      <div className="change-block__options">
        <Checkbox
          text={'Детское кресло'}
          checked={!!childChair}
          onChange={(e) => {
            setChildChair(!childChair)
            dispatch(getChildChairId(!childChair))
          }}
        />
        <Checkbox
          text={'Правый руль'}
          checked={!!rightWheell}
          onChange={(e) => {
            setRightWheell(!rightWheell)
            dispatch(getRightWhelId(!rightWheell))
          }}
        />
        <Checkbox
          text={'Полный бак'}
          checked={!!tank}
          onChange={(e) => {
            setTank(!tank)
            dispatch(getFullTankId(!tank))
          }}
        />
      </div>
      <div className="change-block__btn-block">
        <button
          onClick={changeOrder}
          className={
            isDisabledBtn
              ? 'button button__small hidden'
              : 'button button__small'
          }>
          Изменить
        </button>
        <button onClick={() => close()} className="button button__small">
          Закрыть
        </button>
      </div>
    </section>
  )
}
