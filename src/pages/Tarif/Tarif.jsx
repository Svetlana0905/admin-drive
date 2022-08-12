import '../City/list-block.scss'
import './tarif.scss'
import { useNavigate } from 'react-router-dom'
import {
  useGetTarifQuery,
  useDeleteTarifDataMutation,
  useGetTarifTypeQuery,
  useChangeTarifMutation,
  useAddTarifMutation
} from '../../redux'
import { Spin } from 'antd'
import { SmallButton } from '../../components/Button/Button'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ModalTarif } from './ModalTarif'
import { TarifContent } from './TarifContent'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getStatusAlert } from '../../redux/alertSlice'

export const Tarif = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data = [],
    isLoading,
    isSuccess
  } = useGetTarifQuery({ page: 0, limit: 0 })
  const { data: tarifTypeData = [], isLoading: isLoadingTarifType } =
    useGetTarifTypeQuery({ page: 0, limit: 0 })
  const [tarifDeleteRequest] = useDeleteTarifDataMutation()
  const [tarifChangeRequest] = useChangeTarifMutation()
  const [tarifTypeAddRequest] = useAddTarifMutation()
  const [item, setItem] = useState({})
  const [tarifPriceNumber, setTarifPriceNumber] = useState(0)
  const [inputTarifType, setInputTarifType] = useState('')
  const [tarifNameArr, setTarifNameArr] = useState([])

  const [responseDelete, setResponseDelete] = useState(false)
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [isDisabledModal, setIsDisabledModal] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  let dataSource = []

  const tarifDelete = (item) => {
    setIsVisibleDelete(true)
    setItem(item)
    setErrorMessage(false)
  }
  const deleteItem = async (e) => {
    setResponseDelete(true)
    await tarifDeleteRequest({ tarifId: item.id }).unwrap()
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
    }, 2000)
    setTimeout(() => {
      setResponseDelete(false)
    }, 2500)
  }

  const changeTarif = (item) => {
    setItem(item)
    setIsVisibleModal(true)
    setErrorMessage(false)
  }
  const changeItem = async () => {
    setIsDisabledModal(true)
    let { data } = item
    data = {
      ...data,
      price: tarifPriceNumber
    }
    if (data.price) {
      await tarifChangeRequest({ tarifId: item.id, data }).unwrap()
      setTimeout(() => {
        dispatch(getStatusAlert('Тариф был успешно изменен!'))
        setIsVisibleModal(false)
        setTarifPriceNumber('')
      }, 2000)
    } else {
      setErrorMessage(true)
      setIsDisabledModal(false)
      setIsVisibleModal(true)
    }
  }
  useEffect(() => {
    if (tarifTypeData) {
      setTarifNameArr(tarifTypeData.data.map((item) => item.name))
    }
  }, [tarifTypeData])

  const addTarif = () => {
    setErrorMessage(false)
    setIsVisibleModalAdd(true)
    setTarifNameArr(tarifTypeData.data.map((item) => item.name))
  }
  const addItem = async () => {
    setIsDisabledModal(true)
    const rateType = tarifTypeData.data.filter(
      (item) => item.name && item.name === inputTarifType
    )
    let { data } = item
    data = {
      ...data,
      price: tarifPriceNumber,
      rateTypeId: rateType[0]
    }
    if (tarifPriceNumber && data.rateTypeId) {
      await tarifTypeAddRequest({ data }).unwrap()
      setTimeout(() => {
        dispatch(getStatusAlert('Тариф был добавлен!'))
        setIsVisibleModalAdd(false)
        setIsDisabledModal(false)
        setTarifPriceNumber('')
      }, 2000)
    } else {
      setErrorMessage(true)
      setIsVisibleModalAdd(true)
      setIsDisabledModal(false)
      navigate('*')
    }
  }

  const changeProps = {
    isVisibleModal: isVisibleModal,
    setIsVisibleModal: setIsVisibleModal,
    actions: changeItem,
    text: 'Изменить',
    item: item
  }
  const addProps = {
    isVisibleModal: isVisibleModalAdd,
    setIsVisibleModal: setIsVisibleModalAdd,
    actions: addItem,
    text: 'Добавить',
    tarifNameArr: tarifNameArr
  }

  if (isLoading || isLoadingTarifType)
    return <Spin tip="Loading..." size="large" />
  if (isSuccess) {
    dataSource = data.data
  }
  return (
    <>
      <h2 className="title">Тарифы</h2>
      <div
        className={
          isVisibleDelete || isVisibleModal || isVisibleModalAdd
            ? 'content content__dark'
            : 'content'
        }>
        <div className="content-header">
          <div className="content-header__btn-block"></div>
          <div className="content-header__btn-block">
            <SmallButton text="Создать" onClick={addTarif} />
          </div>
        </div>
        <div className="tarif__subtitle-block">
          <p className="tarif__subtitle-block-tarif">
            <span>Тариф</span>
          </p>
          <span className="tarif__subtitle-block-price">Цена</span>
          <span className="tarif__subtitle-block-buttons">Действие</span>
        </div>
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          itemId={item.id}
          setIsVisibleDelete={setIsVisibleDelete}
          itemDeleteRequest={deleteItem}
          responseDelete={responseDelete}
          text={
            item.rateTypeId ? (
              <span className="text-green"> {item.rateTypeId.name}</span>
            ) : (
              'Тариф'
            )
          }
        />
        <ModalTarif
          props={isVisibleModal ? changeProps : addProps}
          isDisabledModal={isDisabledModal}
          tarifPriceNumber={tarifPriceNumber}
          setTarifPriceNumber={setTarifPriceNumber}
          errorMessage={errorMessage}
          setInputTarifType={setInputTarifType}
          inputTarifType={inputTarifType}
        />
        <TarifContent
          dataSource={dataSource}
          isVisibleDelete={isVisibleDelete}
          isVisibleModalAdd={isVisibleModalAdd}
          changeTarif={changeTarif}
          tarifDelete={tarifDelete}
        />
      </div>
    </>
  )
}
