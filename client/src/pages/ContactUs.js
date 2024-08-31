import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const params = useParams()

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const sendEmail = () => {
    const subject = encodeURIComponent(params.listingName || 'Contact Request');
    const body = encodeURIComponent(message);
    const recipientEmail = 'vedantvaghasiya@gmail.com';
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${subject}&body=${body}`;
    window.open(mailtoLink);
  }
  
  

  return (
    <>
           <Helmet>
                <meta charSet="utf-8" />
                <title>Contact Us</title>
                <meta name='description' content='About page' />
            </Helmet>
      <Navbar />
      <div className="container mt-10 mx-auto text-white">
        <h1 className="text-3xl text-center mb-8">Contact Us</h1>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              className="w-full px-3 py-2 bg-gray-800 rounded"
              type="text"
              name="name"
              value={name}
              onChange={onNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              className="w-full px-3 py-2 bg-gray-800 rounded"
              type="email"
              name="email"
              value={email}
              onChange={onEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Message</label>
            <textarea
              className="w-full px-3 py-2 bg-gray-800 rounded"
              name="message"
              value={message}
              onChange={onMessageChange}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={sendEmail}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default Contact
