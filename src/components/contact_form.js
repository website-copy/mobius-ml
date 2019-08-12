import React from 'react'
import { Link } from 'gatsby'
import './contact_form.module.css'

const ENDPOINT = process.env.CONTACT_FORM_ENDPOINT

class ContactForm extends React.Component {
  constructor (props) {
    super(props)
    this.formRef = React.createRef()
  }

  state = {
    submitError: '',
    loading: false,
    success: false
  }

  createEmail = (form) => {
    const enc = window.encodeURIComponent
    let subj = `Greetings`
    if (form.get('name')) {
      subj += ` from ${form.get('name')}`
      if (form.get('company')) {
        subj += ` on behalf of ${form.get('company')}`
      }
    } else if (form.get('company')) {
      subj += ` from ${form.get('company')}`
    }
    window.location.assign(`mailto:hey@mobius.ml?subject=${enc(subj)}&body=${enc(form.get('message'))}`)
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = new window.FormData(this.formRef.current)

    if (!ENDPOINT) {
      // We don't have a service handling the form submission right now so we do
      // it like this for now.
      console.warn('no contact endpoint set up, using mailto as fallback')
      this.createEmail()
      return
    }

    this.setState({
      submitError: '',
      loading: true
    })

    window.fetch(ENDPOINT, {
      method: 'POST',
      body: form
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unexpected server response')
        }

        window.scrollTo(0, 250)
        this.setState({
          loading: false,
          success: true
        })
      })
      .catch(error => {
        console.error('Form submission error:', error)
        this.setState({
          submitError: 'There was a network error.',
          loading: false
        })
      })
  }

  render () {
    const { loading, success, submitError } = this.state
    if (success) {
      return (
        <div id='form' className='sm-gutters' styleName='contact-form' style={{ textAlign: 'center' }}>
          <h2>You message was successfully sent!</h2>
          <p>Thank you for showing interest</p>
        </div>
      )
    }

    return (
      <form id='form' className='sm-gutters' styleName={`contact-form ${loading ? 'loading ' : ''}`} ref={this.formRef} method='POST' onSubmit={this.handleSubmit} >
        <div className='d-md-flex justify-content-between'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' autoComplete='name' placeholder='Jane Doe' required />
        </div>
        <div className='d-md-flex justify-content-between'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' autoComplete='email' placeholder='janedoe@example.com' required />
        </div>
        <div className='d-md-flex justify-content-between'>
          <label htmlFor='company'>Company</label>
          <input type='text' id='company' name='subject' autoComplete='organization' placeholder='Example Inc.' required />
        </div>
        <div className='d-md-flex justify-content-between'>
          <label htmlFor='message'>Message</label>
          <textarea id='message' name='message' placeholder='Feel free to include any related projects, ideas, or questions you might have...' required />
        </div>
        <p styleName='tiny'>
          I consent to the <Link to='/privacy-policy'>privacy policy</Link> and allowing
          Mobius Labs to store the information transmitted through this form for the purpose of answering the inquiry.
        </p>
        <p styleName='submit'>
          <button className='btn btn--primary' type='submit'>Send message</button>
          {submitError && (
            <p style={{ color: 'red' }}>{submitError}</p>
          )}
        </p>
      </form>
    )
  }
}

export default ContactForm
