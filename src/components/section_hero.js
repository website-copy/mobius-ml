import React from 'react'
import { Link } from 'gatsby'
import './section_hero.module.css'
import Waypoint from './waypoint'

const content = {
  headline: 'Computer Vision, Living on the Edge',
  subline: 'We capture, organize and enjoy our photographs and videos on our personal devices, a.k.a. the edge. Mobius Labs licenses out lightweight, state-of-the-art computer vision algorithms that empower the edge with true visual intelligence.',
  btnDemo: 'Try Mobius Vision',
  btnContact: 'Get in touch'
}

const SectionHero = props => (
  <section styleName='section-hero'>
    <Waypoint threshold={[0.15]}>
      {({ inView }) => (
        <>
          <div className='container'>
            <div className='page-heading'>
              <h1>{content.headline}</h1>
              <p>{content.subline}</p>
              <div styleName='btn-group'>
                <Link to='/demo' className='btn btn--primary'>{content.btnDemo}</Link>
                <Link to='/contact' className='btn'>{content.btnContact}</Link>
              </div>
            </div>
          </div>
          {!inView && (
            <div styleName='sticky-buttons' className='container d-md-none'>
              <div className='sm-gutters'>
                <div styleName='btn-group'>
                  <Link to='/demo' className='btn btn--primary'>Try our demo app</Link>
                  <Link to='/contact' className='btn'>Get in touch</Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Waypoint>
  </section>
)

export default SectionHero
