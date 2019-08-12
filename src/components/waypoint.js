import React, { Component } from 'react'

export default class Waypoint extends Component {
  static defaultProps = {
    onEntered: () => {},
    onEnteredOnce: () => {},
    onExited: () => {},
    className: '',
    classNameInView: '',
    classNameEnteredOnce: '',
    threshold: [0.25]
  }

  constructor (props) {
    super(props)
    this.ref = React.createRef()

    this.state = {
      // currently in view
      inView: false,

      // entered once, ever
      enteredOnce: false,

      // element is coming from below the fold
      below: true
    }
  }

  handle = (entries, obs) => {
    const { inView, enteredOnce } = this.state
    entries.forEach(e => {
      // Edge doesn't currently support isIntersecting
      const ir = e.intersectionRatio

      const below = e.boundingClientRect.top > 0

      if (ir > 0.25 && !inView) {
        this.setState({
          inView: true,
          enteredOnce: true,
          below
        })
        if (!enteredOnce) this.props.onEnteredOnce(below)
        this.props.onEntered(below)
      } else if (ir < 0.25 && inView) {
        this.setState({
          inView: false,
          below
        })
        this.props.onExited(below)
      }
    })
  }

  componentWillUnmount () {
    this.unmounted = true
    this.obs && this.obs.disconnect()
  }

  getInitialState = () => {
    const h = window.innerHeight

    const rect = this.ref.current.getBoundingClientRect()

    const { top, height } = rect

    const r = (h - top) / (h + height)

    const d = 0.25

    const inView = d < r && r < (1 - d)

    if (inView) {
      this.props.onEnteredOnce(r < 0.5)
      this.props.onEntered(r < 0.5)
    }

    return {
      enteredOnce: inView,
      inView,
      below: r < 0.5
    }
  }

  init = () => {
    if (this.unmounted) return

    this.obs = new window.IntersectionObserver(this.handle, {
      threshold: [0.25]
    })

    this.setState(this.getInitialState())

    this.obs.observe(this.ref.current)
  }

  componentDidMount () {
    if (typeof window.IntersectionObserver === `undefined`) {
      // wait for the polyfill
      window._POLY_IO.then(this.init)
    } else {
      this.init()
    }
  }

  render () {
    const {
      children,
      className,
      classNameInView,
      classNameEnteredOnce,
      style
    } = this.props

    const { enteredOnce, inView } = this.state

    const cls = `${className} ${enteredOnce
      ? classNameEnteredOnce : ''} ${inView
      ? classNameInView : ''}`

    return (
      <div ref={this.ref} className={cls} style={style}>
        { typeof children === 'function'
          ? children({ enteredOnce, inView })
          : children
        }
      </div>
    )
  }
}
