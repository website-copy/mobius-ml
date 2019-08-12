import React from 'react'
import Layout from '../components/layout'

import iconAndroid from '../assets/android_sdk.svg'
import iconApple from '../assets/apple.svg'
import iconOnPremise from '../assets/on premise.svg'

import { Strip07 } from '../components/strips.js'

import './docs.module.css'

const content = [
  [ 'On Premise', iconOnPremise, 'https://mobius-on-premise-doc.readthedocs.io/en/latest/' ],
  [ 'Android SDK', iconAndroid, 'https://mobius-sdk-docs.readthedocs.io/en/latest/' ],
  [ 'iOS SDK', iconApple, '' ]
]

const Btn = ({ href, className, label, longLabel, disabled }) => (
  <a href={href} className={`btn ${disabled ? 'disabled' : ''}`}>
    <span className='d-lg-none'>{label}</span>
    <span className='d-none d-lg-inline'>{longLabel || label}</span>
  </a>
)

const DocsPage = (props) => (
  <Layout pageName='Documentation' {...props}>
    <section styleName='docs-page'>
      <Strip07 styleName='strip' />
      <div className='container'>
        <div className='sm-gutters' styleName='heading'>
          <h1>Documentation</h1>
        </div>
      </div>
      <div className='container'>
        <div className='row no-gutters'>
          {content.map(([ label, icon, href ]) => (
            <div key={label} className='col-6 col-sm-4' styleName='box'>
              <img alt={label} src={icon} />
              <h3>{label}</h3>
              <Btn
                disabled={!href}
                href={href}
                label={href ? 'Documentation' : 'Coming soon'}
                longLabel={href && 'See full documentation'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
)

export default DocsPage
