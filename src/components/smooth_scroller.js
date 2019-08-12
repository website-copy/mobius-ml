import React from 'react'
import { smooth } from '../utils/helpers'
import withAddEvent from './with_event_handlers'

class SmoothScroller extends React.Component {
  scrollingRef = null

  static defaultProps = {

    // 0 -> scroll like normal
    // 1 -> appear fixed
    speed: 0.045,

    // try to normalize y so that when the element is at its initial position
    // when it's in the middle of the viewport. always nice to avoid this since
    // it requires the height of the element and viewport (ie. event listeners)
    normalizeY: false,

    // dont wrap in anything
    unwrap: false
  }

  state = {
    y: 0,

    // sets offsetY if this feature is enabled
    offsetY: 0
  }

  unsub = () => {}

  componentWillUnmount () {
    this.unsub()
    window.clearTimeout(this.to)
  }

  nextTick = (f) => () => { this.to = window.setTimeout(f) }

  updMidY = () => {
    const { top, height } = this.scrollingRef.getBoundingClientRect()

    // at this point we want y to be 0
    const offsetY = window.pageYOffset + top - this.state.y + height / 2 - window.innerHeight / 2
    this.setState({ offsetY })
  }

  componentDidMount () {
    if (this.props.normalizeY && !this.scrollingRef) {
      console.warn('normalizeY requires a ref!')
    }

    const midYNextTick = this.nextTick(this.updMidY)
    if (this.props.normalizeY && this.scrollingRef) {
      midYNextTick()
      this.props.addEvent(window, 'resize', midYNextTick)
    }

    this.unsub = smooth(3500, y => {
      this.setState({
        y: Math.round((y - this.state.offsetY) * this.props.speed * 10) / 10
      })
    })
  }

  render () {
    return (this.props.unwrap
        ? this.props.children(this.state.y, (el) => { this.scrollingRef = el })
        : <div className={this.props.className}>{this.props.children(this.state.y, (el) => { this.scrollingRef = el })}</div>
    )
  }
}

export default withAddEvent(SmoothScroller)
