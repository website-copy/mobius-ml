import React, { Component } from 'react'
import { Link } from 'gatsby'
import { isCurrentPage } from '../utils/helpers'
import './header.module.css'
import imgLogo from '../assets/mobius_labs_logo.svg'
import Navigation from './navigation'

const ListLink = ({ to, active, children }) => (
  <li styleName={`list-link ${isCurrentPage(to) ? 'active' : ''}`}>
    <Link to={to}>
      {children}
    </Link>
  </li>
)

const Header = ({ siteTitle, sticky, navOpen, onNavIconClick, onNavLinkClick }) => (
  <header styleName={`header ${sticky ? 'sticky ' : ''}`}>
    <div styleName='floating'>
      <div className='container'>
        <div className='row align-items-center justify-content-between'>
          <Link className='col-auto' styleName='logo' to='/'>
            <img src={imgLogo} alt='Mobius Labs' />
          </Link>
          <Navigation visible={navOpen} onLinkClick={onNavLinkClick} />
          <div className='col-auto d-lg-none d-flex flex-column justify-content-center'>
            <button ariaLabel={`${navOpen ? `Close` : `Open`} navigation`} styleName={`burger ${navOpen ? ' cross' : ''}`} onClick={onNavIconClick} />
          </div>
          <ul className='col-auto d-none d-lg-block' styleName='links'>
            <ListLink to='/#solutions'>Solutions</ListLink>
            <ListLink to='/#features'>Features</ListLink>
            <ListLink to='/#industries'>Industries</ListLink>
            <ListLink to='/docs'>Documentation</ListLink>
            <ListLink to='/about'>About</ListLink>
            <li styleName='list-link'>
              <Link styleName='contact' className='btn' to='/contact'>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
)

// Useful for parallax
export const sampleScrollPos = (cb) => {
  let to
  let last = -1

  const time = () => {
    to = window.requestAnimationFrame(() => {
      if (window.pageYOffset !== last) {
        last = window.pageYOffset
        cb(last)
      }
      time()
    })
  }

  time()
  return () => {
    window.cancelAnimationFrame(to)
  }
}

const stickyListen = (cb) => {
  let sticky = window.pageYOffset > 0
  const handleScroll = () => {
    const t = window.pageYOffset > 0
    if (t !== sticky) {
      sticky = t
      cb(sticky)
    }
  }
  cb(sticky)

  window.addEventListener('scroll', handleScroll)
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

class StickyHeader extends Component {
  state = {
    sticky: false
  }

  componentDidMount () {
    this.unsub = stickyListen(sticky => {
      this.setState({
        sticky
      })
    })
  }

  componentWillUnmount () {
    this.unsub()
  }

  render () {
    return <Header {...this.props} sticky={this.state.sticky} />
  }
}

export default StickyHeader
