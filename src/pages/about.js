import React from 'react'
import Layout from '../components/layout'
import SectionManifesto from '../components/section_manifesto'
import SectionTeam from '../components/section_team'
import SectionContact from '../components/section_contact'

const AboutPage = (props) => (
  <Layout pageName='About' {...props}>
    <SectionManifesto />
    <SectionTeam />
    <SectionContact />
  </Layout>
)

export default AboutPage
