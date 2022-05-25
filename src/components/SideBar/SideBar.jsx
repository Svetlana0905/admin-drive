import './sidebar.scss'
import logoIcon from '../../assets/icons/logo_icon.svg'
import { NavLinkData } from '../../data/navLink'
import { NavLink, Link } from 'react-router-dom'

export const SideBar = ({ isVisible }) => {
  const setActiveNavLink = ({ isActive }) =>
    isActive ? 'nav-link nav-link__active-nav' : 'nav-link'
  return (
    <>
      <div className={isVisible ? 'sidebar' : 'sidebar sidebar__hidden'}>
        <Link to="/">
          <div className="logo__block-small">
            <img
              src={logoIcon}
              className="logo__small-pic"
              alt="logo need for drive"
            />
            <span className="logo__small-title">Need for car</span>
          </div>
        </Link>
        {NavLinkData?.map((item, id) => (
          <NavLink key={id} to={item.link} className={setActiveNavLink}>
            {item.imgpath}
            <span className="text-link">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </>
  )
}
