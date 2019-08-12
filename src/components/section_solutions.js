import React from 'react'
import Slider from './slider'
import './section_solutions.module.css'

import iconOnDevice from '../assets/section_solutions/on-device.svg'
import iconOnPremise from '../assets/section_solutions/on-premise.svg'
import imgVisionSDK from '../assets/section_solutions/vision-sdk.svg'

const columns = [
  {
    icon: iconOnDevice,
    headline: 'On Device SDK',
    body: 'Our lightweight SDK is engineered to run on mobile devices with fast processing (20 ms per image on Snapdragon 820 chipsets), small size and a low energy footprint.'
  },
  {
    icon: iconOnPremise,
    headline: 'On Premise Installation',
    body: 'We license products for processing vast amounts of images directly on your local machines at your premise. This enables smooth integration and control over the data flow.'
  }
]

const nop = () => {}
const renderCol = ({ headline, body, icon, clickHandler = nop }) => (
  <div
    key={headline}
    onClick={clickHandler}
    styleName='col'
    className='b-dark-grad col-md'
  >
    <img styleName='icon' src={icon} alt={headline} />
    <h3>{headline}</h3>
    <p>{body}</p>
  </div>
)

const SectionSolutions = props => (
  <section styleName='section-solutions' id='solutions'>
    <div className='container'>
      <h2 styleName='headline'>Our Solutions</h2>
      <div className='row d-md-flex no-gutters'>
        <div className='col-md-4'>
          <div className='sm-gutters' styleName='mobius-vision'>
            <img src={imgVisionSDK} alt='' />
            <h3>Mobius Vision SDK</h3>
            <p>Available as on device SDK or on premise installation</p>
          </div>
        </div>
        <div className='d-none d-md-block col-md-8'>
          {columns.map(({ headline, body, icon }) => (
            <div key={headline} styleName='vert-col' className='b-dark d-flex align-items-center'>
              <img styleName='icon' src={icon} alt={headline} />
              <div styleName='vert-content' className='d-flex flex-column justify-content-center'>
                <h3>{headline}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Slider columns={columns} renderCol={renderCol} />
    </div>
  </section>
)

export default SectionSolutions
