import stub from '../../assets/stub.jpg'
export const CarImageBlock = ({ item }) => {
  return (
    <p className="content__img-inner">
      {item.carId ? (
        <img
          src={item.carId.thumbnail.path}
          className="content__car-pic"
          alt={item.name}
        />
      ) : (
        <img src={stub} className="content__car-pic" alt={item.name} />
      )}
    </p>
  )
}
