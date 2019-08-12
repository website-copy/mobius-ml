import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import CodeExamples, { transformSnippets } from './code_examples'
import Img from 'gatsby-image'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Indicator from './indicator'
import Waypoint from './waypoint'

import withTicker from './with_ticker_state'
import withModuloCounter from './with_modulo_counter'

import { Strip03 } from './strips'

import './section_searching.module.css'

const SimilarityBubble = withTicker(({ trDelay, similarity, ticker }) => {
  const percentage = ticker * similarity
  return (
    <span
      className='bubble'
      styleName='similarity'
      style={{ transitionDelay: `${trDelay}s` }}
    >
      <Indicator percentage={percentage} />
      {Math.round(percentage)}% Similarity
    </span>
  )
})

const D = 0.18

// start to enter after 4 has exited, first element exit at the same time as the
// first enters
const trDelColExit = (i, n) => D * (n - i)
const trDelColEnter = (i, n) => -0.01 * D + trDelColExit(i, n)
const trDelCol = {
  enter: trDelColEnter,
  exit: trDelColExit
}

const trDelBubble = (i, n) => D + trDelColEnter(i, n)
const trDelCounter = (i, n) => 0.7 + 2.5 * D + trDelBubble(i, n)
const trDurCounter = (i, n) => 7 - trDelCounter(i, n) - 0.7

const GridImage = ({ image, children, trDelay, className = '' }) => (
  <div className={`tr_cls col-6 col-sm-3 ${className}`} >
    <div styleName={`photo-wrapper ${image.similarity === 'KEY' ? ' photo-wrapper-key' : ''}`}>
      <div className='tr_cls_inner' style={{ transitionDelay: `${trDelay}s` }} >
        <Img fluid={image.fluid} styleName='photo' />
        {children}
      </div>
    </div>
  </div>
)

const SectionPhotoSimilarity = ({ timeout, images, animateOut, inView }) => (
  <div styleName='section-photo-similarity' >
    <div className='row no-gutters'>
      {images.map((image, i) => (
        <GridImage
          key={image.name}
          image={image}
          className={i < 6 ? '' : 'd-none d-sm-block'}
          trDelay={trDelCol[animateOut ? 'enter' : 'exit'](i, images.length)}
        >
          {image.similarity === 'KEY' ? (
            <span className='bubble' styleName='keyimage'>
              Key image for search
            </span>
          ) : (
            <SimilarityBubble
              trDelay={trDelBubble(i, images.length)}
              key={image.name}
              startOnMount={inView}
              duration={1000 * trDurCounter(i, images.length)}
              delayStart={1000 * trDelCounter(i, images.length)}
              similarity={image.similarity}
            />
          )}
        </GridImage>
      ))}
    </div>
  </div>
)

const SwitchingSet = withModuloCounter(
  ({ activeIndex, sets, setCounterEnabled, inView }) => {
    const keys = Object.keys(sets)
    const set = sets[keys[activeIndex]]
    const timeout = 3500

    return (
      <Waypoint
        onExited={setCounterEnabled.bind(this, false)}
        onEntered={setCounterEnabled.bind(this, true)}
        style={{ position: 'relative' }}
      >
        {({ inView }) => (
          <TransitionGroup component={null}>
            <CSSTransition
              classNames='fade'
              key={keys[activeIndex]}
              timeout={timeout}
            >
              {state => (
                <SectionPhotoSimilarity
                  inView={inView}
                  timeout={timeout}
                  images={set}
                  animateOut={['entered', 'exiting'].includes(state)}
                />
              )}
            </CSSTransition>
          </TransitionGroup>
        )}
      </Waypoint>
    )
  }
)

const SectionSearching = ({ imageSets, snippets }) => (
  <section styleName='section-searching'>
    <div className='container'>
      <div className='sm-only-gutters'>
        <h2>Similarity Search: Match style and content</h2>
        <p>
          They say a picture is worth a thousand words. Mobius Vision is able to search for images
          that are similar both in style and content.
          Simply provide a reference image, and let our powerful algorithms do the magic.
        </p>
      </div>
    </div>

    <div style={{ position: 'relative' }}>
      <Strip03 styleName='strip' />
      <SwitchingSet
        startEnabled={false}
        duration={1500}
        modulo={Object.keys(imageSets).length}
        sets={imageSets}
      />
    </div>
    {/*<CodeExamples snippets={snippets} />*/}
  </section>
)

const transformData = (data) => ({
  ...data,
  imageSets: data.images.edges.reduce((acc, { node }) => {
    const set = /set_[^/]+/.exec(node.relativePath)[0]
    const image = {
      name: node.name,
      similarity: node.name.split('__')[1] === 'KEY'
        ? 'KEY'
        : parseInt(node.name.split('__')[1].slice(0, 2), 10),
      fluid: node.childImageSharp.fluid
    }
    acc[set] = acc[set] ? acc[set].concat(image) : [image]
    return acc
  }, {}),
  // snippets: transformSnippets(data.snippets)
})

const SectionSearchingWithStaticState = () => (
  <StaticQuery
    query={graphql`
    query SectionSearching {
      images: allFile(
        sort: {fields: relativePath}
        filter: {
          extension: {in: ["jpg", "png"]},
          relativePath: {glob: "section_searching/set_*/*"}
        }) {
        edges {
          node {
            name
            relativePath
            childImageSharp {
              fluid(maxWidth: 356, maxHeight: 236) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
#      snippets: allFile(filter: {relativePath: {glob: "section_searching/code_examples/*"}}) {
#        ...CodeSnippets
#      }
    }`}
    render={data => <SectionSearching {...transformData(data)} />}
  />
)

export default SectionSearchingWithStaticState
