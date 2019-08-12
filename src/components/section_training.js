import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import CodeExamples, { transformSnippets } from './code_examples'
import Waypoint from './waypoint'
import Img from 'gatsby-image'
import './section_training.module.css'

import { Strip01 } from './strips'

const DELAY = 200
const SectionPhotoSelection = ({ images }) => {
  const tmp = images.map((_, i) => ({
    img: i * DELAY,
    symbol: i * DELAY * 1.25,
    overlay: i * DELAY * 1.50
  }))

  // last two wont be shuffled because they're not shown on mobile
  const shuffled = tmp.splice(6)

  for (let i = tmp.length; i; i--) {
    let r = Math.floor(Math.random() * i)
    shuffled.unshift(tmp.splice(r, 1)[0])
  }

  const styles = shuffled.map(
    d => Object.keys(d).reduce(
      (acc, k) => ({
        ...acc,
        [k]: {
          transitionDelay: `${d[k]}ms`
        }
      }), {})
  )
  return (
    <Waypoint>
      {({ enteredOnce }) => (
        <div styleName='section-photo-selection' >
          <div className='row no-gutters'>
            {images.map((img, i) => (
              <div
                key={i}
                className={`col-6 col-sm-3 ${i < 6 ? '' : 'd-none d-sm-block'}`}
              >
                <div styleName={`photo-wrapper ${img.selection} ${enteredOnce ? 'entered' : ''}`}>
                  <div styleName='before' style={styles[i].symbol} />
                  <Img fluid={img.fluid} alt='' style={styles[i].img} styleName='photo' />
                  <div styleName='after' style={styles[i].symbol} />
                  <div styleName='overlay' style={styles[i].overlay} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Waypoint>
  )
}

const SectionTraining = ({ images, snippets }) => (
  <section styleName='section-training' id='features'>
    <div className='container'>
      <div styleName='text-container' className='sm-only-gutters'>
        <h2>
          Customized Training: Anyone can now train an AI model!
        </h2>
        <p>
          Everyone has different visual preferences &mdash; so you should be able to teach a machine what you like. Want to find the photo that best communicates your style to your audience? Or are you looking for your personal highlights summary of your last trip? With the customized training feature of Mobius Vision SDK, anyone can now train an AI model by selecting a few pictures they want to see, and a few they do not want to see. Your customized model is ready in just a few clicks!
        </p>
      </div>
    </div>
    <div style={{ position: 'relative' }}>
      <Strip01 styleName='strip' />
      <SectionPhotoSelection images={images} />
    </div>
    {/*<CodeExamples collapsable snippets={snippets} />*/}
  </section>
)

const withStaticData = (Component, transResp) => props => (
  <StaticQuery
    query={graphql`
      query SectionTraining {
        images: allFile(
          sort: {fields: relativePath}
          filter: {
            extension: {in: ["jpg", "png"]},
              relativeDirectory: {eq: "section_training/set_01"}
          }) {
          edges {
            node {
              name
              childImageSharp {
                fluid(maxWidth: 356, maxHeight: 236) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
#        snippets: allFile(filter: {relativePath: {glob: "section_training/code_examples/*"}}) {
#          ...CodeSnippets
#        }
      }`
    }
    render={data => <Component {...props} {...transResp(data)} />}
  />
)

export default withStaticData(SectionTraining, (data) => ({
  ...data,
  images: data.images.edges.map(edge => ({
    fluid: edge.node.childImageSharp.fluid,
    selection: edge.node.name.split('__')[1].indexOf('POSITIVE') === 0 ? 'accept' : 'reject'
  })),
  // snippets: transformSnippets(data.snippets)
}))
