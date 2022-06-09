import { Checkbox } from '../../components/Button/Button'
export const CheckBoxReadOnly = ({ item }) => {
  return (
    <div className="content__options">
      <Checkbox
        text={'Детское кресло'}
        checked={item.isNeedChildChair}
        readonly
      />
      <Checkbox text={'Правый руль'} checked={item.isRightWheel} readonly />
      <Checkbox text={'Полный бак'} checked={item.isFullTank} readonly />
    </div>
  )
}
