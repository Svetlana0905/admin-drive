import '../City/list-block.scss'
import {
  useAddTarifTypeMutation,
  useChangeTarifTypeMutation,
  useDeleteTarifTypeMutation,
  useGetTarifTypeQuery
} from '../../redux'
import { Spin } from 'antd'
import { SmallButton } from '../../components/Button/Button'
import { DeleteOrder } from '../../components/DeleteOrder/DeleteOrder'
import { ModalTarifType } from './ModalTarifType'
import { TarifTypeContent } from './TarifTypeContent'
import { useState } from 'react'

export const TarifType = () => {
  const {
    data = [],
    isLoading,
    isSuccess
  } = useGetTarifTypeQuery({ page: 0, limit: 0 })
  const [tarifDeleteRequest] = useDeleteTarifTypeMutation()
  const [tarifChangeRequest] = useChangeTarifTypeMutation()
  const [tarifAddRequest] = useAddTarifTypeMutation()
  const [tarifName, setTarifName] = useState('')
  const [tarifUnit, setTarifUnit] = useState('')
  const [item, setItem] = useState({})
  const [isDisabledModal, setIsDisabledModal] = useState(false)
  const [responseDelete, setResponseDelete] = useState(false)
  const [isVisibleDelete, setIsVisibleDelete] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState(false)
  const [tarifId, setTarifId] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  let dataSource = []

  const changeTarif = (item) => {
    setItem(item)
    setErrorMessage(false)
    setTarifName(item ? item.name : '')
    setTarifUnit(item ? item.unit : '')
    setIsDisabledModal(false)
    setIsVisibleModal(true)
  }
  const changeItem = async () => {
    let { data } = item
    data = {
      ...data,
      name: tarifName,
      unit: tarifUnit
    }
    if (tarifName && tarifUnit) {
      await tarifChangeRequest({ tarifId: item.id, data }).unwrap()
      setIsDisabledModal(true)
      setTimeout(() => {
        setIsVisibleModal(false)
      }, 2000)
      setTimeout(() => {
        setIsDisabledModal(false)
      }, 2500)
    } else {
      setErrorMessage(true)
      setIsDisabledModal(false)
      setIsVisibleModal(true)
    }
  }
  const addTarifType = () => {
    setIsDisabledModal(false)
    setIsVisibleModalAdd(true)
    setTarifName('')
    setTarifUnit('')
  }
  const addItem = async () => {
    let { data } = item
    data = {
      ...data,
      name: tarifName,
      unit: tarifUnit
    }
    if (tarifName && tarifUnit) {
      await tarifAddRequest({ data }).unwrap()
      setIsDisabledModal(true)
      setTimeout(() => {
        setIsVisibleModalAdd(false)
      }, 2000)
      setTimeout(() => {
        setIsDisabledModal(false)
        setTarifName('')
        setTarifUnit('')
      }, 2500)
    } else {
      setErrorMessage(true)
      setIsDisabledModal(false)
      setIsVisibleModalAdd(true)
    }
  }
  const tarifDelete = (item) => {
    setIsVisibleDelete(true)
    setTarifId(item.id)
    setTarifName(item ? item.name : '')
  }
  const deleteItem = async (e) => {
    setResponseDelete(true)
    await tarifDeleteRequest({ tarifId }).unwrap()
    setTimeout(() => {
      setIsVisibleDelete(!isVisibleDelete)
      setResponseDelete(false)
    }, 2000)
  }
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
  if (isLoading) return <Spin tip="Loading..." size="large" />
  if (isSuccess) {
    dataSource = data.data
  }
  return (
    <>
      <h2 className="title">Типы тарифов</h2>
      <div
        className={
          isVisibleDelete || isVisibleModal || isVisibleModalAdd
            ? 'content content__dark'
            : 'content'
        }>
        <div className="content-header">
          <div className="content-header__btn-block"></div>
          <div className="content-header__btn-block">
            <SmallButton text="Создать" onClick={addTarifType} />
          </div>
        </div>
        <DeleteOrder
          isVisibleDelete={isVisibleDelete}
          itemId={tarifId}
          setIsVisibleDelete={setIsVisibleDelete}
          itemDeleteRequest={deleteItem}
          responseDelete={responseDelete}
          text={
            tarifName ? (
              <span className="text-green"> {tarifName}</span>
            ) : (
              'Тариф'
            )
          }
        />
        <ModalTarifType
          props={isVisibleModal ? changeProps : addProps}
          setTarifName={setTarifName}
          tarifName={tarifName}
          isDisabledModal={isDisabledModal}
          tarifUnit={tarifUnit}
          setTarifUnit={setTarifUnit}
          errorMessage={errorMessage}
        />
        <TarifTypeContent
          dataSource={dataSource}
          isVisibleDelete={isVisibleDelete}
          isVisibleModal={isVisibleModal}
          changeTarif={changeTarif}
          tarifDelete={tarifDelete}
        />
      </div>
    </>
  )
}
