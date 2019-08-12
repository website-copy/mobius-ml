import React from 'react'
import './indicator.module.css'

const Indicator = ({ percentage, className = '' }) => (
  <span styleName='indicator' className={className} style={{ backgroundPosition: `${percentage}%` }} />
)

export default Indicator
