import { ReactComponent as Img1 } from '../assets/icons/nav_icon1.svg'
import { ReactComponent as Img2 } from '../assets/icons/nav_icon2.svg'
import { ReactComponent as Img3 } from '../assets/icons/nav_icon3.svg'
import { ReactComponent as Img4 } from '../assets/icons/nav_icon4.svg'
import { ReactComponent as Img5 } from '../assets/icons/nav_icon5.svg'
import { ReactComponent as Img6 } from '../assets/icons/nav_icon6.svg'
import { ReactComponent as Img7 } from '../assets/icons/nav_icon7.svg'

export const NavLinkData = [
  {
    imgpath: <Img1 className="nav-link__img" width="13px" height="14.5px" />,
    link: 'car',
    title: 'Карточка автомобиля'
  },
  {
    imgpath: <Img2 className="nav-link__img" width="15px" height="15px" />,
    link: 'cars-list',
    title: 'Список авто'
  },
  {
    imgpath: <Img3 className="nav-link__img" width="15px" height="14px" />,
    link: 'city',
    title: 'Города'
  },
  {
    imgpath: <Img4 className="nav-link__img" />,
    link: 'point',
    title: 'Пункты'
  },
  {
    imgpath: <Img5 className="nav-link__img" />,
    link: 'tarif',
    title: 'Тариф'
  },
  {
    imgpath: <Img6 className="nav-link__img" width="14px" height="14px" />,
    link: 'tarif-type',
    title: 'Типы Тарифов'
  },
  {
    imgpath: <Img7 className="nav-link__img" width="14px" height="14px" />,
    link: 'orders',
    title: 'Заказы'
  }
]