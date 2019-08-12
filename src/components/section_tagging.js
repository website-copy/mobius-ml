import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import CodeExamples, { transformSnippets } from './code_examples'
import Img from 'gatsby-image'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import withModuloCounter from './with_modulo_counter'
import './section_tagging.module.css'

import { Strip02 } from './strips'

const SWITCH_INTERVAL = 7000

const IMAGE_WIDTH = 648
const IMAGE_HEIGHT = 648

const TaggedImage = ({ image, keywords, entered }) => (
  <div styleName={`tagged-image ${entered ? 'entered' : ''}`} >
    <Img alt='example photo' fluid={image.fluid} />
{/*    {keywords.map(({ x, y, name }, i) => (
      <div key={name} style={{
        top: y,
        left: x,
        animationDelay: `${i * 0.15}s`
      }} className='bubble' styleName='tag'>{name}</div>
    ))}*/}
  </div>
)

const getKeywords = node => {
  return node.childImageKeywording.keywords.map(k => {
    if (/%$/.test(k.x)) {
      return k
    }

    return {
      ...k,
      x: `${100 * parseInt(k.x, 10) / IMAGE_WIDTH}%`,
      y: `${100 * parseInt(k.y, 10) / IMAGE_HEIGHT}%`
    }
  })
}

const ImageSwitcher = withModuloCounter(({ activeIndex, images }) => {
  const node = images.edges[activeIndex].node
  // const keywords = getKeywords(node)

  return (
    <TransitionGroup
      style={{
        position: 'relative',
        height: 0,
        paddingBottom: `${100 / node.childImageSharp.fluid.aspectRatio}%`
      }}
    >
      <CSSTransition
        classNames='fade'
        timeout={1000}
        key={node.name}
      >
        {status => (
          <TaggedImage
            entered={['appeared', 'entered'].includes(status)}
            image={node.childImageSharp}
            // keywords={keywords}
          />
        )}
      </CSSTransition>
    </TransitionGroup>
  )
})

const SectionTagging = ({ snippets, images }) => (
  <section styleName='section-tagging' >
    <Strip02 styleName='strip' />
    <div className='container'>
      <div className='row justify-content-between'>
        <div className='col-md-6'>
          <div className='sm-gutters'>
            <h2>
              Image and Video Keywording: Predict over 5000 keywords
            </h2>
            <p>
              Our SDK includes a keywording model that can recognize over 5000 objects, emotions and actions, which can be used to efficiently tag, organize and categorize large image and video collections, and enables users to quickly retrieve visual content.
            </p>
          </div>
          <div styleName='code'>
            {/*<CodeExamples snippets={snippets} />*/}
          </div>
        </div>
        <div className='col-md-6'>
          <ImageSwitcher
            modulo={images.edges.length}
            interval={SWITCH_INTERVAL}
            images={images}
          />
        </div>
      </div>
    </div>
  </section>
)

const SectionTaggingWithData = () => (
  <StaticQuery
    query={graphql`
      query SectionTagging {
#        snippets: allFile(filter: {relativePath: {glob: "section_tagging/code_examples/*"}}) {
#          ...CodeSnippets
#        }
        images: allFile(filter: { extension: {in: ["jpg", "png"]} relativeDirectory: {eq: "section_tagging" }}) {
          edges {
            node {
              name
              childImageSharp {
                fluid(maxWidth: 648, maxHeight: 648) {
                  ...GatsbyImageSharpFluid
                }
                original {
                  width, height
                }
              }
#              childImageKeywording {
#                keywords {
#                  x,y,name
#                }
#              }
            }
          }
        }
      }
    `}
    render={({ snippets, images }) => (
      <SectionTagging images={images} />
    )}
  />
)

export default SectionTaggingWithData
// {/*<SectionTagging snippets={transformSnippets(snippets)} images={images} />*/}
