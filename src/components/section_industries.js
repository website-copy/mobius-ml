import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import './section_industries.module.css'

const content = [
  {
    headline: 'Smart camera assistants',
    text: 'Phone and Camera Manufacturer',
    body: 'Our software lives on the edge to empower OEMs to offer exciting features to mobile phone and camera users. Recognizing key concepts in images to switch to a shooting mode or suggesting optimal cropping of visual data.',
    photoText: 'Smart camera assistants'
  },
  {
    headline: 'Empower app users',
    text: 'Mobile App Industry',
    body: 'Use our custom models to build personalized visual experiences for your users on their local devices. Mobius Vision can sift through large collections of images and videos in seconds, uncovering visual content that suits your app’s style and intent.',
    photoText: 'Empower app users'
  },
  {
    headline: 'Organize your image data',
    text: 'Photo Management and AdTech',
    body: 'The ability to serve the right content to a customer is key in any stock photo agency. Our powerful aesthetics model can be used to sort large bodies of visual data. Is your customer after a specific style? Then you can retrain the model to suit their style.',
    photoText: 'Organize your image data'
  }
]

const Industry = ({ headline, text, body, image, photoText }) => (
  <div styleName='industry' className='row justify-content-center no-gutters'>
    <div className='col-md-5' styleName='photo-col'>
      <div styleName='photo-wrapper'>
        <Img fluid={image.fluid} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }} />
        <span styleName='photo-text'>{photoText}</span>
      </div>
    </div>
    <div className='col-md-7' styleName='col'>
      <div styleName='gutters'>
        <h3>{headline}</h3>
        <p>{body}</p>
      </div>
    </div>
  </div>
)

const SectionIndustries = ({ images }) => (
  <section styleName='section-industries' id='industries'>
    <div className='container'>
      <h2>Industries</h2>
      {content.map((props, i) => (
        <Industry key={i} {...props} image={images[i]} />
      ))}
      <p className='d-none d-md-block' style={{ textAlign: 'center', marginBottom: 0 }}>
        <Link className='btn btn--primary' to='/demo' style={{ marginBottom: 0, marginRight: '0.5rem' }}>Try Mobius Vision</Link>
        <Link className='btn' to='/contact' style={{ marginBottom: 0, marginLeft: '0.5rem' }}>Get in touch</Link>
      </p>
    </div>
  </section>
)

const SectionIndustriesImages = () => (
  <StaticQuery
    query={graphql`
    query SectionIndustries {
      images: allFile(
        filter: { relativePath: { glob: "section_industries/*" }}
        sort: {fields : name}
      ) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxWidth: 576, grayscale: true) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }`}
    render={({ images }) => (
      <SectionIndustries images={images.edges.map(({ node }) => ({
        name: node.name,
        ...node.childImageSharp
      }))} />
    )}
  />
)

export default SectionIndustriesImages
