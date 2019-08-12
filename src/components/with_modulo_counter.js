import React from 'react'

const withModuloCounter = Wrapped => class extends React.Component {
  static defaultProps = {
    interval: 8000,
    modulo: 0,
    startIndex: 0,
    startEnabled: true,
    bypass: false
  }

  constructor (props) {
    super(props)

    this.state = {
      activeIndex: props.startIndex,
      counterEnabled: props.startEnabled
    }
  }

  componentDidMount () {
    this.reschedule()
  }

  componentWillUnmount () {
    window.clearTimeout(this.to)
  }

  setCounterEnabled = (enabled) => {
    if (enabled === this.state.counterEnabled) return

    this.setState({ counterEnabled: enabled })
  }

  reschedule = () => {
    if (this.props.bypass) return
    window.clearTimeout(this.to)
    this.to = window.setTimeout(this.tick, this.props.interval)
  }

  tick = () => {
    if (this.state.counterEnabled) {
      this.setState({
        activeIndex: (this.state.activeIndex + 1) % this.props.modulo
      })
    }
    this.reschedule()
  }

  render () {
    return <Wrapped
      {...this.props}
      {...this.state}
      setCounterEnabled={this.setCounterEnabled}
    />
  }
}

export default withModuloCounter
