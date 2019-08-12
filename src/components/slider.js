import React from 'react'
import withEventHandlers from './with_event_handlers'
import './slider.module.css'

const ITEM_MIN_WIDTH = 240

class Slider extends React.Component {
  sliderRef = React.createRef()

  state = {
    activeIndex: 0,
    dragging: false,
    dragX0: 0,
    dragDx: 0,
    containerWidth: 0
  }

  handleBtnClick = (i) => {
    this.setState({
      activeIndex: i
    })
  }

  handleMouseDown = e => {
    this.setState({
      // dragging flag is pending until dragged over threshold
      dragging: false,
      dragX0: e.clientX,
      dragX: e.clientX
    })
  }

  handleTouchStart = e => {
    this.handleMouseDown(e.touches[0])
  }

  onResize = () => {
    this.setState({
      sliderWidth: this.sliderRef.current.offsetWidth,
      parentWidth: this.sliderRef.current.parentNode.offsetWidth
    })
  }

  resetDrag = () => {
    this.enableScroll()
    if (this.state.dragging) {
      this.setState({
        dragging: false,
        dragX0: 0,
        dragX: 0
      })
    }
  }

  enableScroll = () => {
    if (!this.state.disableScroll) return
    this.setState({
      disableScroll: false
    })
  }

  disableScroll = () => {
    if (this.state.disableScroll) return
    this.setState({
      disableScroll: true
    })
  }

  onMove = e => {
    const { clientX } = e.touches ? e.touches[0] : e
    const { activeIndex, dragging, dragX0, parentWidth } = this.state
    const { columns } = this.props

    if (dragX0 === 0) {
      return
    }

    // dx in absolute pixels
    const dragDx = clientX - dragX0

    // dx absolute distance
    const dragDxDist = Math.abs(dragDx)

    // dx distance relative to parent node (the viewport)
    const dragDxDistParent = dragDxDist / parentWidth

    // -1 if negative direction
    const sign = dragDx / dragDxDist

    if (!dragging && dragDxDistParent > 0.1) {
      // don't scroll around while dragging
      this.disableScroll()

      this.setState({
        dragging: true
      })
    }

    if (dragging) {
      if (dragDxDistParent > 0.25) {
        // dragging 25% over the viewport triggers a switch
        this.resetDrag()
        this.setState({
          activeIndex: Math.max(0, Math.min(columns.length - 1, activeIndex - sign)),
          ignoreNextClick: true
        })
      } else {
        this.setState({ dragX: clientX })
      }
    }
  }

  dontScroll = (e) => {
    if (this.state.disableScroll) {
      e.preventDefault()
    }
  }

  setActive = (i) => {
    if (this.state.ignoreNextClick) {
      this.setState({
        ignoreNextClick: false
      })
    } else {
      this.setState({
        ignoreNextClick: false,
        activeIndex: i
      })
    }
  }

  componentDidMount () {
    this.props.addEvent(window, 'resize', this.onResize)
    this.props.addEvent(document.scrollingElement, 'touchmove', this.dontScroll, { passive: false })
    this.props.addEvent(window, ['touchend', 'mouseup'], this.resetDrag)
    this.props.addEvent(window, ['touchmove', 'mousemove'], this.onMove)

    this.onResize()
  }

  render () {
    const { activeIndex, sliderWidth, dragX0, dragX } = this.state
    const { columns, renderCol } = this.props

    // dx relative to slider (larger than screen) in percentages
    const dx = Math.round(100 * (dragX - dragX0) / sliderWidth)

    return <>
      <div
        ref={this.sliderRef}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        className='row d-md-none'
        styleName='slider'
        style={{
          width: `${100 * 2 / 3 * columns.length}%`,
          minWidth: ITEM_MIN_WIDTH * columns.length,
          transform: `translate3d(${-100 / columns.length * activeIndex + dx}%,0,0)`
        }}
      >
        {columns.map((col, i) => renderCol({
          ...col,
          clickHandler: this.setActive.bind(this, i)
        }))}
      </div>
      <div className='d-md-none' styleName='slider-dots'>
        {columns.map((_, i) => (
          <button
            onClick={this.handleBtnClick.bind(this, i)}
            key={i}
            styleName={`dot ${activeIndex === i ? 'active-dot' : ''}`}
            ariaLabel={`Slide ${i + i}`}
          />
        ))}
      </div>
    </>
  }
}

export default withEventHandlers(Slider)
