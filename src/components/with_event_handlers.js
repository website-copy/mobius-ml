import React from 'react'

// Test via a getter in the options object to see if the passive property is accessed
let supportsPassive = false
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function () { // eslint-disable-line
      supportsPassive = true
    }
  })
  window.addEventListener('testPassive', null, opts)
  window.removeEventListener('testPassive', null, opts)
} catch (e) {}

const listen = (n, evt, cb, _opts) => {
  let opts = _opts
  if (typeof opts === 'object' && !supportsPassive) {
    // useCapture instead
    opts = !opts.passive
  }

  n.addEventListener(evt, cb, opts)
  return () => n.removeEventListener(evt, cb, opts)
}

const withEventHandlers = Wrapped => class extends React.Component {
  subscriptions = []

  unsubAll = () => {
    this.subscriptions.forEach(unsub => unsub())
    this.subscriptions = []
  }

  addEvent = (target, _events, cb, opts) => {
    const events = typeof _events === 'string' ? [_events] : _events
    events.forEach(evt => {
      this.subscriptions.push(listen(target, evt, cb, opts))
    })
  }

  componentWillUnmount () {
    this.unsubAll()
  }

  render () {
    return (
      <Wrapped {...this} {...this.props} />
    )
  }
}

export default withEventHandlers
