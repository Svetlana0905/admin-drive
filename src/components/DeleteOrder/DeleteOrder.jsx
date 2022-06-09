import './deliteOrder.scss'

export const DeleteOrder = ({
  itemId,
  isVisibleDelete,
  setIsVisibleDelete,
  itemDeleteRequest,
  responseDelete,
  text
}) => {
  return (
    <section
      className={isVisibleDelete ? 'delete-block' : 'delete-block__hidden'}>
      <div
        className={
          responseDelete ? 'delete-response' : 'delete-response__hidden'
        }>
        {text} был удален
      </div>
      <div
        className={
          responseDelete ? 'delete-block__hidden' : 'delete-block__body'
        }>
        <p className="text-link">Вы действительно хотите удалить {text}</p>
        <span className="text-dark">{itemId}</span>
      </div>
      <div className="delete-block__btn-block">
        <button
          disabled={responseDelete}
          onClick={itemDeleteRequest}
          className={
            responseDelete
              ? 'button button__small button__delite hidden'
              : 'button button__small button__delite'
          }>
          Удалить
        </button>
        <button
          onClick={() => setIsVisibleDelete(!isVisibleDelete)}
          className="button button__small">
          {responseDelete ? 'Закрыть' : 'Отменить'}
        </button>
      </div>
    </section>
  )
}
