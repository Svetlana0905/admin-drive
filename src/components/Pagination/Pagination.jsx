import { Pagination } from 'antd'

export const PaginationAdmin = ({ total }) => {
  return <Pagination defaultCurrent={1} total={total} size="small" />
}
