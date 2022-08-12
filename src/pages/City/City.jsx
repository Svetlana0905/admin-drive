import './list-block.scss'
import {
  useGetCityQuery,
  useDeleteCityDataMutation,
  useChangeCityMutation,
  useAddCityDataMutation
} from '../../redux/'
import { useDispatch } from 'react-redux'
import { getCityData } from '../../redux/CitySlice'
import { Spin } from 'antd'
import { SmallButton, ListButton } from '../../components/Button/Button'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ModalCity } from './ModalCity'
import { useEffect, useState } from 'react'
import { getStatusAlert } from '../../redux/alertSlice'

export const City = () => {
  const dispatch = useDispatch()
  const {
    data = [],
    isLoading,
    isSuccess
  } = useGetCityQuery({ page: 0, limit: 0 })
  const [cityDeleteRequest] = useDeleteCityDataMutation()
  const [cityChangeRequest] = useChangeCityMutation()
  const [cityAddRequest] = useAddCityDataMutation()

  const [cityName, setCityName] = useState('')
  const [deliteCityName, setDeliteCityName] = useState('')
  const [isDisabledModal, setIsDisabledModal] = useState(false)
  const [responseDelete, setResponseDelete] = useState(false)
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState(false)
  const [cityId, setCityId] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  let dataSource = []

  const cityDelete = (item) => {
    setIsVisibleDelete(true)
    setCityId(item.id)
    setDeliteCityName(item.name)
  }
  const changeCity = (item) => {
    setErrorMessage(false)
    setCityId(item.id)
    setCityName(item.name)
    setIsDisabledModal(false)
    setIsVisibleModal(true)
  }
  const addCity = () => {
    setIsDisabledModal(false)
    setIsVisibleModalAdd(true)
    setCityName('')
  }
  const addItem = async () => {
    const data = {}
    data.name = cityName
    if (data.name) {
      setIsDisabledModal(true)
      await cityAddRequest({ data }).unwrap()
      setTimeout(() => {
        dispatch(getStatusAlert('Город был успешно добавлен!'))
      }, 2000)
      setTimeout(() => {
        setIsVisibleModalAdd(false)
        setIsDisabledModal(false)
      }, 2500)
    } else {
      setErrorMessage(true)
      setIsDisabledModal(false)
      setIsVisibleModalAdd(true)
    }
  }
  const changeItem = async () => {
    setIsDisabledModal(true)
    const data = {}
    data.name = cityName
    if (cityName) {
      await cityChangeRequest({ cityId, data }).unwrap()
      setTimeout(() => {
        dispatch(getStatusAlert('Город был успешно изменен!'))
      }, 2000)
      setTimeout(() => {
        setIsVisibleModal(false)
        setIsDisabledModal(false)
      }, 2500)
    } else {
      setErrorMessage(true)
      setIsDisabledModal(false)
      setIsVisibleModal(true)
    }
  }
  const deleteItem = async (e) => {
    setResponseDelete(true)
    await cityDeleteRequest({ cityId }).unwrap()
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
      setResponseDelete(false)
    }, 2000)
  }
  useEffect(() => {
    dispatch(getCityData(data.data))
  }, [data, dispatch])

  const changeProps = {
    isVisibleModal: isVisibleModal,
    setIsVisibleModal: setIsVisibleModal,
    actions: changeItem,
    text: 'Изменить'
  }
  const addProps = {
    isVisibleModal: isVisibleModalAdd,
    setIsVisibleModal: setIsVisibleModalAdd,
    actions: addItem,
    text: 'Добавить'
  }
  if (isSuccess) {
    dataSource = data.data.map((item) => ({ ...item, key: item.id }))
  }
  return (
    <>
      <h2 className="title">Список городов</h2>
      <div
        className={
          isVisibleDelete || isVisibleModal || isVisibleModalAdd
            ? 'content content__dark'
            : 'content'
        }>
        {isLoading && <Spin tip="Loading..." size="large" />}
        <div className="content-header">
          <div className="content-header__btn-block"></div>
          <div className="content-header__btn-block">
            <SmallButton text="Создать" onClick={addCity} />
          </div>
        </div>
        <div className="city__subtitle-block">
          <div className="city__subtitle-block-inner">
            <span className="city__subtitle-block-city">Город</span>
            <span className="city__subtitle-block-buttons">Действие</span>
          </div>
        </div>
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          itemId={cityId}
          setIsVisibleDelete={setIsVisibleDelete}
          itemDeleteRequest={deleteItem}
          responseDelete={responseDelete}
          text={deliteCityName}
        />
        <ModalCity
          props={isVisibleModal ? changeProps : addProps}
          setCityName={setCityName}
          cityName={cityName}
          isDisabledModal={isDisabledModal}
          errorMessage={errorMessage}
        />
        <div className="list-block__inner-point">
          {dataSource?.length ? (
            <div className="list-block__column">
              {dataSource.map((item, id) => (
                <div className="list-block__row" key={id}>
                  <p className="list-block__text">{item.name}</p>
                  <div className="buttons-group">
                    <ListButton
                      text="Изменить"
                      clickHandler={(e) => changeCity(item)}
                    />
                    <ListButton
                      text="Удалить"
                      clickHandler={(e) => cityDelete(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}
