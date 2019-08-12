import React from 'react'
import './section_manifesto.module.css'
import { Strip04 } from './strips'

const GradientBox = ({ children }) => (
  <div styleName='gradient-box'>
    <h2>{children}</h2>
  </div>
)

const SectionManifesto = () => (
  <section styleName='manifesto' style={{ marginBottom: '5rem' }}>
    <Strip04 styleName='strip' />
    <div className='container'>
      <div className='page-heading'>
        <h1>The Mobius Manifesto</h1>
        <p>
          We are powering computer vision towards ubiquity.<br />
          We build technology that makes devices truly visually intelligent.<br />
          We build technology that amplifies human intelligence.<br />
          We are in the business of technology licensing.<br />
          We are at the intersection of two huge and rapidly growing markets.<br />
          We engineer for customer delight.<br />
          We go where the puck will be.<br />
        </p>
      </div>
      <GradientBox>
        We Take Computer Vision to the Edge
      </GradientBox>
    </div>
  </section>
)

export default SectionManifesto
