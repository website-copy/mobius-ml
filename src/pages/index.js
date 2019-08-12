import React from 'react'
import Layout from '../components/layout'
import SectionHero from '../components/section_hero'
import SectionSolutions from '../components/section_solutions'
import SectionTraining from '../components/section_training'
import SectionTagging from '../components/section_tagging'
import SectionSearching from '../components/section_searching'
import SectionAesthetics from '../components/section_aesthetics'
import SectionEngineeredFor from '../components/section_engineeredfor'
import SectionIndustries from '../components/section_industries'

const IndexPage = (props) => (
  <Layout {...props} >
    <SectionHero />
    <SectionSolutions />
    <SectionTraining />
    <SectionTagging />
    <SectionSearching />
    <SectionAesthetics />
    <SectionEngineeredFor />
    <SectionIndustries />
  </Layout>
)

export default IndexPage
