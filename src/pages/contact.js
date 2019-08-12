import React from 'react'
import Layout from '../components/layout'
import ContactForm from '../components/contact_form'
import './contact.module.css'
import { Strip06 } from '../components/strips'

const ContactPage = props => (
  <Layout {...props}>
    <section styleName='contact-page'>
      <Strip06 styleName='strip' />
      <div className='container'>
        <div styleName='header' className='sm-gutters'>
          <h1 >
            Get in touch
          </h1>
          <p>
            We are happy to answer your questions about our products, services and pricing. We will be in touch as soon as possible.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  </Layout>
)

export default ContactPage
