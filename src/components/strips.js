import React from 'react'

import strip01 from '../assets/strips/strip_01.svg'
import strip02 from '../assets/strips/strip_02.svg'
import strip03 from '../assets/strips/strip_03.svg'
import strip04 from '../assets/strips/strip_04.svg'
import strip05 from '../assets/strips/strip_05.svg'
import strip06 from '../assets/strips/strip_06.svg'
import strip07 from '../assets/strips/strip_07.svg'

import SmoothScroller from './smooth_scroller'

import './strips.module.css'

const getImgFunc = ({ className, ...props }) => (y, ref) => (
  <div className={className} ref={ref}>
    <img
      alt=''
      style={{ transform: `translate3d(0, ${y}px, 0)` }}
      {...props}
    />
  </div>
)

const StripContainer = props => (
  <SmoothScroller styleName='strip-container'>
    {getImgFunc(props)}
  </SmoothScroller>
)

export default StripContainer

// yellow green bottom crop
export const Strip01 = (props) => (
  <StripContainer {...props} src={strip01} />
)

// blue green top crop
export const Strip02 = (props) => (
  <StripContainer {...props} src={strip02} />
)

// pink purple top crop
export const Strip03 = (props) => (
  <StripContainer {...props} src={strip03} />
)

// yellow pink top crop
export const Strip04 = (props) => (
  <StripContainer {...props} src={strip04} />
)

// green yellow top crop
export const Strip05 = (props) => (
  <StripContainer {...props} src={strip05} />
)

// purple pink bottom crop
export const Strip06 = (props) => (
  <StripContainer {...props} src={strip06} />
)

// blue green top crop
export const Strip07 = (props) => (
  <StripContainer {...props} src={strip07} />
)
