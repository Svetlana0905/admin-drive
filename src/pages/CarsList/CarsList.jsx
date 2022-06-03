import './carsList.scss'
import { useGetCarQuery } from '../../redux/'
// import { useDispatch } from 'react-redux'
// import stub from '../../assets/stub.jpg'
import { Table, Spin } from 'antd'

export const CarsList = () => {
  // const dispatch = useDispatch()
  const { data = [], isLoading, isSuccess } = useGetCarQuery()
  let dataSource = []
  console.log(data)
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Город',
      dataIndex: 'name',
      key: 'name'
    }
  ]

  function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return (
        <button className="pagination-btn" type="button">
          «
        </button>
      )
    }
    if (type === 'next') {
      return (
        <button className="pagination-btn" type="button">
          »
        </button>
      )
    }
    return originalElement
  }

  if (isSuccess) {
    dataSource = data.data.map((item) => ({ ...item, key: item.id }))
    // dispatch(getCityData(data.data))
  }

  return (
    <>
      <h1 className="title">CarsList</h1>
      <div className="content-column">
        {isLoading && <Spin tip="Loading..." size="large" />}
        {dataSource.length ? (
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
              pageSize: '4',
              position: ['bottomCenter'],
              size: 'small',
              itemRender: (current, type, originalElement) =>
                itemRender(current, type, originalElement)
            }}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}
