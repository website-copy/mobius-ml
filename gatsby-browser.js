/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.onClientEntry = () => {
  // NOTE: Don't polyfill Promise here (Gatsby already includes a Promise polyfill)

  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    // import should already be polyfilled by babel
    window._POLY_IO = import(`intersection-observer`).then(
      _ => {
        console.log(`👍 IntersectionObserver is polyfilled`)
      }
    )
  }
}

exports.onInitialClientRender = () => {
  console.log('ReactDOM.render has executed')
}
