import {
  useGetCityQuery,
  useGetPointQuery,
  useDeletePointMutation,
  useAddPointDataMutation,
  useChangePointMutation
} from '../../redux/'
import { Spin } from 'antd'
import { PointComponent } from './PointComponent'
import { useEffect, useState } from 'react'
import { SmallButton } from '../../components/Button/Button'
import { ListDropdown } from '../../components/ListDropdown/ListDropdown'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ModalPoint } from './ModalPoint'
import { getStatusAlert } from '../../redux/alertSlice'
import { useDispatch } from 'react-redux'

export const Point = () => {
  const dispatch = useDispatch()
  const { data: pointArr = [], isLoading } = useGetPointQuery({
    page: 0,
    limit: 0
  })
  const {
    data: city = [],
    isSuccess: citySuccess,
    isLoading: cityLoadung
  } = useGetCityQuery({
    page: 0,
    limit: 0
  })
  const [pointDeleteRequest] = useDeletePointMutation()
  const [pointChangeRequest] = useChangePointMutation()
  const [pointAddRequest] = useAddPointDataMutation()
  const [filterPoint, setFilterPoint] = useState([])
  const [cityInputFilter, setCityInputFilter] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [pointName, setPointName] = useState('')
  const [pointAddress, setPointAddress] = useState('')
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [responseDelete, setResponseDelete] = useState(false)
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isDisabledModal, setIsDisabledModal] = useState(false)
  const [errorMassage, setErrorMassage] = useState(false)
  const [itemPoint, setItemPoint] = useState({})

  let cityArr = []
  useEffect(() => {
    if (cityInputFilter && pointArr) {
      setFilterPoint(
        pointArr.data.filter(
          (item) => item.cityId && item.cityId.name === cityInputFilter
        )
      )
    } else setFilterPoint(pointArr.data) // ????
  }, [cityInputFilter, pointArr])

  const clearCityInputFilter = () => {
    setCityInputFilter('')
    setFilterPoint(pointArr.data)
  }

  if (citySuccess) {
    cityArr = Array.from(new Set(city.data.map((e) => e.name)))
  }
  const deletePoint = (item) => {
    setItemPoint(item)
    setIsVisibleDelete(true)
  }

  const deleteItem = async (e) => {
    setResponseDelete(true)
    await pointDeleteRequest({ pointId: itemPoint.id }).unwrap()
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
      setResponseDelete(false)
    }, 2000)
  }
  const getCityObj = () => {
    let cityObj = {}
    if (cityInput && city) {
      cityObj = city?.data?.filter(
        (item) => item.name && item.name === cityInput
      )
    }
    let { data } = itemPoint
    data = {
      ...data,
      address: pointAddress,
      cityId: cityObj[0],
      name: pointName
    }
    return data
  }
  const changePoint = (item) => {
    setErrorMassage(false)
    setItemPoint(item)
    setIsDisabledModal(false)
    setIsVisibleModal(true)
  }
  const changeItem = async () => {
    const data = getCityObj()
    if (pointName && pointAddress) {
      await pointChangeRequest({ pointId: itemPoint.id, data }).unwrap()
      setIsDisabledModal(true)
      setErrorMassage(false)
      dispatch(getStatusAlert('Точка была успешно изменена!'))
      setTimeout(() => {
        setIsVisibleModal(false)
        setIsDisabledModal(false)
        setPointName('')
        setPointAddress('')
      }, 2000)
    } else {
      setErrorMassage(true)
      setIsDisabledModal(false)
      setIsVisibleModal(true)
      dispatch(getStatusAlert(false))
    }
  }
  const addPoint = () => {
    setIsDisabledModal(false)
    setIsVisibleModalAdd(true)
  }
  const addItem = async () => {
    const data = getCityObj()
    if (data.cityId && data.address && data.name) {
      setErrorMassage(false)
      await pointAddRequest({ data }).unwrap()
      setIsDisabledModal(true)
      setPointName('')
      setPointAddress('')
      dispatch(getStatusAlert('Точка была успешно добавлена!'))
      setTimeout(() => {
        setIsVisibleModalAdd(false)
      }, 2000)
      setTimeout(() => {
        setPointName('')
        setPointAddress('')
        setIsDisabledModal(false)
      }, 2500)
    } else {
      setErrorMassage(true)
      setIsDisabledModal(false)
      setIsVisibleModalAdd(true)
    }
  }

  const addProps = {
    isVisibleModal: isVisibleModalAdd,
    setIsVisibleModal: setIsVisibleModalAdd,
    actions: addItem,
    text: 'Добавить',
    item: itemPoint,
    pointName: pointName,
    setPointName: setPointName,
    setPointAddress: setPointAddress,
    pointAddress: pointAddress
  }
  const changeProps = {
    isVisibleModal: isVisibleModal,
    setIsVisibleModal: setIsVisibleModal,
    actions: changeItem,
    text: 'Изменить',
    item: itemPoint,
    pointName: pointName,
    setPointName: setPointName,
    setPointAddress: setPointAddress,
    pointAddress: pointAddress
  }

  if (cityLoadung || isLoading) return <Spin tip="Loading..." size="large" />
  return (
    <>
      <h2 className="title">Список точек</h2>
      <div
        className={
          isVisibleDelete || isVisibleModalAdd || isVisibleModal
            ? 'content content__dark'
            : 'content'
        }>
        <div className="content-header">
          <div className="content-header__btn-block">
            <div className="modal-block__listdd">
              <ListDropdown
                textSpan="Выберите город"
                data={cityArr}
                setInputText={setCityInputFilter}
                textInput={cityInputFilter}
                clearInput={clearCityInputFilter}
              />
            </div>
          </div>
          <div className="content-header__btn-block">
            <SmallButton text="Создать" onClick={addPoint} />
          </div>
        </div>
        <div className="point__subtitle-block">
          <p className="point__subtitle-block-address">
            <span>Название</span>
            <span>Адрес</span>
          </p>
          <span className="point__subtitle-block-city">Город</span>
          <span className="point__subtitle-block-buttons">Действие</span>
        </div>
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          itemId={itemPoint.id}
          setIsVisibleDelete={setIsVisibleDelete}
          itemDeleteRequest={deleteItem}
          responseDelete={responseDelete}
          text={itemPoint.name}
        />
        <ModalPoint
          props={isVisibleModal ? changeProps : addProps}
          isDisabledModal={isDisabledModal}
          cityArr={cityArr}
          setCityInput={setCityInput}
          cityInput={cityInput}
          errorMassage={errorMassage}
          setErrorMassage={setErrorMassage}
        />
        {filterPoint?.length ? (
          <div className="list-block__column">
            {filterPoint.map((item) => (
              <PointComponent
                key={item.id}
                deletePoint={deletePoint}
                changePoint={changePoint}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="content__row">Записи не найдены</div>
        )}
      </div>
    </>
  )
}
