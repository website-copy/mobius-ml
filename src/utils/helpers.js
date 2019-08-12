import { withPrefix } from 'gatsby'

export const IS_BROWSER = typeof window !== 'undefined'

const trimSlash = url => url.replace(/\/$/, '')

export const isCurrentPage = to => IS_BROWSER &&
  trimSlash(window.location.pathname) === trimSlash(withPrefix(to))

export const easeOutQuad = (t, _c, d, b = 0) => {
  var c = _c - b
  return -c * (t /= d) * (t - 2) + b
}

export const easeOutExpo = function (t, _c, d, b = 0) {
  var c = _c - b
  return (t === d) ? b + c : c * (-Math.pow(3, -10 * t / d) + 1) + b
}

export const rAF = (() => {
  if (typeof window === 'undefined') return
  const cbs = []

  const _rAF = cb => {
    let f = null

      // let t0 = performance.now()
    ;(function loop () {
      f = window.requestAnimationFrame(loop)
      cb()
    })()

    // dispose function
    return () => {
      window.cancelAnimationFrame(f)
    }
  }

  _rAF(() => {
    cbs.forEach(cb => cb())
  })

  // add a callback to the list
  return cb => {
    cbs.push(cb)

    // unsubscribe function
    return () => {
      if (~cbs.indexOf(cb)) {
        cbs.splice(cbs.indexOf(cb), 1)
      }
    }
  }
})()

export const transition = ({ start, end, duration = 3500, easing = easeOutQuad }, cb) => {
  let value
  let t0 = window.performance.now()
  let t = t0
  const unsub = rAF(() => {
    t = window.performance.now() - t0
    value = easing(Math.min(t, duration), end, duration, start || 0)
    cb(value)
    if (value === end) {
      unsub()
    }
  })
  return unsub
}

export const smooth = (duration, cb) => {
  if (typeof window === 'undefined') return
  let yOffset = window.pageYOffset
  let t0 = window.performance.now()
  let t = t0
  let to = yOffset
  let from = yOffset
  let current = yOffset

  const unsub = rAF(() => {
    yOffset = window.pageYOffset

    if (yOffset !== to) {
      to = yOffset
      from = current
      t0 = t
    }

    t += 16.6

    let dt = t - t0

    let tmp = easeOutExpo(
      Math.min(dt, duration),
      to,
      duration,
      from
    )
    let dy = Math.abs(current - tmp)

    if (dy > 0) {
      cb(current)
    } else {
      from = to
      t0 = t
    }

    current = tmp
  })

  return unsub
}
