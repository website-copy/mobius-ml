import React from 'react'
import Layout from '../components/layout'

const DemoPage = (props) => (
  <Layout {...props}>
    <section className='container'>
      <div className='page-heading'>
        <h1><span>Mobius Vision<br class="full-width-breakpoint"/> Demo</span></h1>
        <p>
          Please send an email to <a href='mailto:sales@mobius.ml'>sales@mobius.ml</a> to get access to our mobile demo app to test the Android SDK or access to our demo API for the on-premise SDK.
        </p>
      </div>
      <div style={{ paddingBottom: `${100 * 360 / 640}%`, position: 'relative', height: 0 }} >
        <iframe
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          title='Mobius SDK'
          src='https://player.vimeo.com/video/290139608'
          width='640'
          height='360'
          frameBorder='0'
          webkitAllowFullscreen
          mozAllowFullscreen
          allowFullscreen
          allow='autoplay; encrypted-media' />
      </div>
    </section>
  </Layout>
)

export default DemoPage
