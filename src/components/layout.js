import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import withEventHandlers from './with_event_handlers'
import ogImage from '../assets/og_image.png'
import twitterImage from '../assets/twitter_image.png'

import Header from './header'
import Footer from './footer'

import './layout.css'

class Layout extends Component {
  state = {
    // burger navigation open, visible on mobile
    navOpen: false
  }

  handleNavIconClick = () => {
    this.setState({
      navOpen: !this.state.navOpen
    })
  }

  handleNavLinkClick = ({ to, active }) => {
    if (active) {
      this.setState({
        navOpen: false
      })
    }
  }

  dontScroll = (e) => {
    if (this.state.navOpen) {
      e.preventDefault()
    }
  }

  componentDidMount () {
    window.scroll({ left: 0, top: 0, behavior: 'instant' })
    this.props.addEvent(document.scrollingElement, 'touchmove', this.dontScroll)
  }

  render () {
    const { navOpen } = this.state
    const { children, pageName } = this.props

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
                description
                keywords
                siteUrl
              }
            }
          }
        `}
        render={({ site }) => (
          <>
            <Helmet
              title={`${pageName ? `${pageName} | ` : ''}${site.siteMetadata.title}`}
              meta={[
                { name: 'description', content: site.siteMetadata.description },
                { name: 'keywords', content: site.siteMetadata.keywords },
                { property: 'og:description', content: site.siteMetadata.description },
                { property: 'og:image', name: 'image', content: site.siteMetadata.siteUrl + ogImage },
                { property: 'og:site_name', content: site.siteMetadata.title },
                { property: 'og:title', content: `${pageName ? `${pageName} | ` : ''}${site.siteMetadata.title}` },
                { property: 'og:type', content: 'website' },
                { name: 'twitter:site', content: '@mobiusml' },
                { name: 'twitter:description', content: site.siteMetadata.description },
                { name: 'twitter:image', content: site.siteMetadata.siteUrl + twitterImage }
              ]}
            >
              <link rel='canonical' href={`${site.siteMetadata.siteUrl}${this.props.location.pathname}`} />
              <link href='//fonts.googleapis.com/css?family=Roboto+Mono:' rel='stylesheet' type='text/css' />
              <html className={navOpen ? 'nav-open' : ''} lang='en' />
            </Helmet>
            <Header
              navOpen={navOpen}
              onNavIconClick={this.handleNavIconClick}
              onNavLinkClick={this.handleNavLinkClick}
              siteTitle={site.siteMetadata.title}
            />
            <main className='page-content'>
              {children}
            </main>
            <Footer />
          </>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default withEventHandlers(Layout)
