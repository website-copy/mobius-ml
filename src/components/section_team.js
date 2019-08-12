import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'
import './section_team.module.css'

import { Strip05 } from '../components/strips'

const SectionTeam = ({ teamPhoto }) => (
  <section styleName='team'>
    <Strip05 styleName='strip' />
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <Img alt='Team Photo' fluid={teamPhoto} />
        </div>
        <div className='col-md-6'>
          <div className='sm-gutters'>
            <h2>The team</h2>
            <p>
              We are passionate, seriously talented and ambitious
            </p>
            <p>
              4 PhDs, 4 Master of Science, 3 best PhD awards
            </p>
            <p>
              Over 80 publications, 5000+ citations, influential Computer Vision works in academia and industry
            </p>
            <a href='https://angel.co/mobius-labs-berlin' className='btn'>Join the team</a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default props => <StaticQuery
  query={graphql`
    query AboutPage {
      teamPhoto: file(name: {eq: "Mobius-team"}) {
        childImageSharp {
          fluid(cropFocus: CENTER, maxWidth: 648, maxHeight: 480) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `}
  render={data => (
    <SectionTeam
      {...props}
      teamPhoto={data.teamPhoto.childImageSharp.fluid}
    />
  )}
/>
