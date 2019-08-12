import React from 'react'
import { Link } from 'gatsby'
import './footer.module.css'
import imgLogo from '../assets/mobius_labs_pictogram.svg'

const ListLink = ({ to, children }) => (
  <li styleName={`list-link`}>
    <Link to={to}>
      {children}
    </Link>
  </li>
)

const Footer = () => (
  <footer styleName='footer'>
    <div className='container d-lg-none'>
      <img styleName='logo logo-mobile' src={imgLogo} alt='Mobius Labs' />
    </div>
    <hr styleName='ruler' />
    <div className='container' style={{ backgroundColor: 'var(--black)' }}>
      <div className='row justify-content-between align-items-center'>
        <ul className='col-auto' styleName='links'>
          <ListLink to='/'>Home</ListLink>
          <ListLink to='/docs/'>Documentation</ListLink>
          <ListLink to='/about/'>About</ListLink>
          <ListLink to='/imprint/'>Imprint</ListLink>
          <ListLink to='/privacy-policy/'>Privacy Policy</ListLink>
        </ul>
        <div className='col-auto d-none d-lg-block'>
          <img styleName='logo' src={imgLogo} alt='Mobius Labs' />
        </div>
      </div>
    </div>
    <hr styleName='ruler' />
    <div className='container'>
      <div className='row no-gutters justify-content-between'>
        <div className='col-auto'>
        </div>
        <div className='col-auto'>
          <p>&copy; 2018 -- 2019 All rights reserved</p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
