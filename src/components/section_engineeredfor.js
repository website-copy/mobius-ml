import React from 'react'
import { Link } from 'gatsby'
import Slider from './slider'
import './section_engineeredfor.module.css'
import iconSpeed from '../assets/section_engineeredfor/speed.svg'
import iconSecurity from '../assets/section_engineeredfor/security.svg'
import iconSimplicity from '../assets/section_engineeredfor/simplicity.svg'

const columns = [
  {
    icon: iconSpeed,
    headline: 'Speed',
    body: 'Our on-device models leverage GPU and DSP in mobile chipset hardware, and clock 18 millisecond to process an image/frame on a decent smartphone. '
  },
  {
    icon: iconSecurity,
    headline: 'Privacy',
    body: 'All the computation happens on-device, and your data never leaves your device. This makes sure that your privacy is preserved — always.'
  },
  {
    icon: iconSimplicity,
    headline: 'Simplicity',
    body: 'A few lines of code and the system is up and running — no installation hassle anymore! Engineers without knowledge of computer vision can easily integrate our solutions.'
  }
]

const nop = () => {}

const renderCol = ({ headline, body, icon, clickHandler = nop }) => (
  <div
    key={headline}
    onClick={clickHandler}
    className='col col-md'
    styleName='col'
  >
    <div styleName='col-inner'>
      <img styleName='icon' src={icon} alt={headline} />
      <h3 styleName='col-headline'>{headline}</h3>
      <p styleName='col-body'>{body}</p>
    </div>
  </div>
)

const SectionEngineeredFor = (props) => (
  <section styleName='section-engineeredfor' id='engineered-for'>
    <div className='container'>
      <h2 styleName='headline'>Engineered for...</h2>
      <Slider columns={columns} renderCol={renderCol} />
      <div className='row d-none d-md-flex'>
        {columns.map(renderCol)}
      </div>
    </div>
    <p className='d-none d-md-block' style={{ textAlign: 'center', marginBottom: 0, marginTop: '3rem' }}>
      <Link className='btn' to='/contact' style={{ marginBottom: 0 }}>Get in touch</Link>
    </p>
  </section>
)

export default SectionEngineeredFor
