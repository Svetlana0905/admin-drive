import { useGetPointQuery } from '../../redux/'
import { useDispatch } from 'react-redux'
import { getPointsData } from '../../redux/PointsSlice'
import { Table, Spin } from 'antd'

export const Point = () => {
  const dispatch = useDispatch()
  const { data = [], isLoading, isSuccess } = useGetPointQuery()
  let dataSource = []
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Город',
      dataIndex: ['cityId', 'name'],
      key: 'name'
    },
    {
      title: 'Адресс',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Название',
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
    // console.log(data.data)
    dataSource = data.data.map((item) => ({ ...item, key: item.id }))
    dispatch(getPointsData(data))
  }
  return (
    <>
      <h1 className="title">PointsList</h1>
      <div className="content-column">
        {isLoading && <Spin tip="Loading..." size="large" />}
        {/* <Filter /> */}
        {dataSource ? (
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
