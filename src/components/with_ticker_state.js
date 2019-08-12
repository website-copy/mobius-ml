import React from 'react'
import { transition, easeOutQuad } from '../utils/helpers'

const withTicker = Wrapped => class extends React.Component {
  static defaultProps = {
    start: 0,
    end: 1,
    duration: 3500,
    // timeout before start (to allow staggering effect)
    delayStart: 0,
    startOnMount: false,
    easing: easeOutQuad,
    onEnded: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      ticker: props.end
    }
    this.unsub = _ => {}
    this.to = null
  }

  componentWillUnmount () {
    window.clearTimeout(this.to)
    this.unsub()
  }

  componentDidMount () {
    if (this.props.startOnMount) {
      this.resetCounter()
    }
  }

  _resetNow = () => {
    const { start, end, duration, easing } = this.props
    this.unsub = transition({ start, end, duration, easing }, (ticker) => {
      this.setState({ ticker })
      if (ticker === end) {
        this.props.onEnded()
      }
    })
  }

  resetCounter = () => {
    const { start, delayStart } = this.props
    if (delayStart === 0) {
      this._resetNow()
      return
    }

    this.setState({
      ticker: start
    })

    window.clearTimeout(this.to)
    this.to = window.setTimeout(() => {
      this._resetNow()
    }, delayStart)
  }

  render () {
    return (
      <Wrapped
        {...this.props}
        {...this.state}
        resetCounter={this.resetCounter}
      />
    )
  }
}

export default withTicker
