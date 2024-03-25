import React, { useState, useEffect } from 'react'
import Header from './common/Header'

const Support = () => {
  const [fields, setFields] = useState({})
  const [err, setErr] = useState({})

  const handleChnge = evnt => {
    var field = fields
    field[evnt.target.name] = evnt.target.value
    setFields(field)
  }
  const validateChnge = evnt => {
    var name = evnt.target.name
    var val = evnt.target.value
    if (name === 'name' && val.length < 2)
      setErr({ ...err, name: '*Please Enter Valid Name' })
    else if (name === 'name') setErr({ ...err, name: '' })

    if (name === 'email' && val.length < 5)
      setErr({ ...err, email: '*Please Enter Valid Email' })
    else if (name === 'email') setErr({ ...err, email: '' })

    if (name === 'comment' && val.length < 10)
      setErr({
        ...err,
        comment: '*Please Enter Valid Comment (min 10 letter)',
      })
    else if (name === 'comment') setErr({ ...err, comment: '' })
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (err.name === '' && err.email === '' && err.comment === '') {
      alert(
        'Appreciate Your concern ' +
          fields.name +
          ' we will shortly response on ' +
          fields.email,
      )
      window.location.assign('/Support')
    } else {
      alert('*Please Fill all Fields')
    }
  }
  return (
    <div style={{ background: '#cff' }}>
      <Header />
      <div
        className="w-100 d-flex align-items-center justify-content-center"
        style={{ marginTop: '7vh', minHeight: '93vh' }}>
        <form
          className="w-50 p-5 rounded-lg shadow-lg"
          style={{ minHeight: '60vh', background: '#efe' }}>
          <h2 className="w-100 text-center text-muted">
            Your Feedback is valuable for us.
          </h2>
          <div className="form-group">
            <label className="text-monospace" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              required
              onChange={handleChnge}
              onBlur={validateChnge}
            />
            <small className="text-danger">{err.name}</small>
          </div>
          <div className="form-group">
            <label className="text-monospace" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              onChange={handleChnge}
              onBlur={validateChnge}
            />
            <small className="text-danger">{err.email}</small>
          </div>
          <div className="form-group">
            <label className="text-monospace" htmlFor="comment">
              Comment
            </label>
            <textarea
              className="form-control"
              name="comment"
              required
              onChange={handleChnge}
              rows="8"
              onBlur={validateChnge}
            />
            <small className="text-danger">{err.comment}</small>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Support
