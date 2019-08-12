import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import CodeExamples, { transformSnippets } from './code_examples'
import Waypoint from './waypoint'
import './section_aesthetics.module.css'
import Img from 'gatsby-image'
import Indicator from './indicator'
import withTicker from './with_ticker_state'
import SmoothScroller from './smooth_scroller'

import { Strip04 } from './strips'

const AestheticsPhoto = withTicker(({ image, resetCounter, ticker, wrapperRef, y }) => (
  <Waypoint onEnteredOnce={resetCounter} styleName='aesthetics-photo'>
    {({ enteredOnce }) => (
      <div styleName={`${enteredOnce ? 'entered' : ''}`} ref={wrapperRef} style={{ transform: `translate3d(0, ${y}px, 0)` }}>
        <Img fluid={image.fluid} />
        <span styleName='score' className='bubble'>
          <Indicator className='indicator' percentage={ticker * image.score} />
          {Math.round(ticker * image.score)}% Aesthetics score
        </span>
      </div>
    )}
  </Waypoint>
))

const SectionAesthetics = ({ snippets, images }) => (
  <section styleName='section-aesthetics' id='aesthetics'>
    <Strip04 styleName='strip' />
    <div className='container'>
      <div className='row no-gutters justify-content-between flex-md-row-reverse'>
        <div className='col-md-6 d-flex flex-column justify-content-center'>
          <div style={{ margin: 'auto', width: '100%' }}>
            <div className='sm-gutters'>
              <h2>
                Aesthetics: Find the best photos hidden in your photo collections
              </h2>
              <p>
                Mobius Vision comes shipped with a pre-trained, powerful aesthetics model that
                can be used for a variety of tasks, including sorting large image collections,
                finding the best images, as well as filtering out bad content.
              </p>
            </div>
            <div styleName='code'>
              {/*<CodeExamples snippets={snippets} />*/}
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div styleName='photos'>
            {images.map((image, i) => (
              <SmoothScroller
                key={image.name}
                normalizeY
                unwrap
                speed={0.02 * (images.length - i) + 0.045}
              >
                {(y, ref) => (
                  <AestheticsPhoto image={image} wrapperRef={ref} y={y} />
                )}
              </SmoothScroller>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

const transformData = (data) => ({
  ...data,
  images: data.images.edges.map(edge => edge.node).map(el => ({
    name: el.name,
    score: parseInt(el.name.split('__')[1], 10),
    fluid: el.childImageSharp.fluid
  }), {}),
  // snippets: transformSnippets(data.snippets)
})

export default (props) => (
  <StaticQuery
    query={graphql`
    query SectionAesthetics {
      images: allFile(
        limit: 3
        sort: {fields: relativePath}
        filter: {
          extension: {in: ["jpg", "png"]},
          relativeDirectory: {eq: "section_aesthetics/photos"}
        }) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxWidth:432) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
#      snippets: allFile(filter: {relativePath: {glob: "section_aesthetics/code_examples/*"}}) {
#        ...CodeSnippets
#      }
    }`}
    render={data => <SectionAesthetics {...props} {...transformData(data)} />}
  />
)
