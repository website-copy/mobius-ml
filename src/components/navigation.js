import React from 'react'
import { Link } from 'gatsby'
import { isCurrentPage } from '../utils/helpers'
import './navigation.module.css'
import imgStrip01 from '../assets/strips/strip_01.svg'

const NavLink = ({ onClick, to = '#todo', children }) => (
  <li styleName={`list-link ${isCurrentPage(to) ? 'active ' : ''}`}>
    <Link
      onClick={onClick.bind(this, { to, active: isCurrentPage(to) })}
      to={to}
    >{children}</Link>
  </li>
)

const ContactLink = ({ to = '#contact', onClick, children }) => (
  <li styleName={`list-link contact ${isCurrentPage(to) ? 'active ' : ''}`}>
    <Link
      className='btn'
      onClick={onClick.bind(this, { to, active: isCurrentPage(to) })}
      to={to}>Contact</Link>
  </li>
)

const Strip = () => (
  <img styleName='strip' alt='' src={imgStrip01} />
)

const Navigation = ({ visible, onLinkClick }) => (
  <div className='d-lg-none d-flex' styleName={`navigation ${!visible ? 'closed' : ''}`} >
    <Strip />
    <div className='container'>
      <ul styleName='links'>
        <NavLink to='/' onClick={onLinkClick}>Home</NavLink>
        <NavLink to='/docs' onClick={onLinkClick}>Documentation</NavLink>
        <NavLink to='/about' onClick={onLinkClick}>About</NavLink>
        <ContactLink to='/contact' onClick={onLinkClick} />
      </ul>
    </div>
  </div>
)

export default Navigation
