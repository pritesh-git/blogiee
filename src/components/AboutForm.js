import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Axios from 'axios'
import { BASE_URL } from './config/config.js'
import { useNavigate, useLocation } from 'react-router-dom'

const AboutForm = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [fields, setFields] = useState({
    hobbies: 'Development',
    bio: '',
    about_me: '',
  })
  const [errs, setErrs] = useState({})
  const [flag, setFlag] = useState(true)

  const regData = location.state || {}

  const handleChange = e => {
    e.preventDefault()
    let temp = fields
    temp[e.target.name] = e.target.value
    setFields({ ...fields, [e.target.name]: e.target.value })
    setFlag(false)
  }
  const handleFileOpen = e => {
    setFile(e.target.files[0])
  }

  const handleSize = e => {
    e.preventDefault()
    var err = errs
    if (e.target.value.length < 30)
      err[e.target.name] = '*Please Enter at least 30 letters'

    if (e.target.value.length > 250)
      err[e.target.name] = '*Please Enter at most 250 letters'

    setErrs(err)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (
      regData !== undefined &&
      regData !== null &&
      errs.about_me === undefined &&
      errs.bio === undefined
    ) {
      const formData = new FormData()
      formData.append('profile_pic', file)
      formData.append('fnm', regData.fnm)
      formData.append('lnm', regData.lnm)
      formData.append('about_me', fields.about_me)
      formData.append('bio', fields.bio)
      formData.append('email', regData.email)
      formData.append('hobbies', fields.hobbies)
      formData.append('password', regData.password)

      Axios.post(BASE_URL + 'newUser', formData)
        .then(res => {
          if (res.data.success) {
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/Profile')
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      if (regData === undefined) navigate('/')
    }
  }
  return (
    <div className="text-monospace">
      <h1 className="text-center m-3 text-info">
        <u>Registration Form</u>
      </h1>
      {regData && (
        <Form as={Container} className="p-4 mt-0" encType="multipart.form-data">
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue={regData.fnm + regData.lnm}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue={regData.email} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Bio
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows="3"
                name="bio"
                value={fields.bio}
                onBlur={handleSize}
                onFocus={e => {
                  setErrs({ ...errs, [e.target.name]: undefined })
                }}
                onChange={handleChange}
              />
              <Form.Text className="text-danger">{errs.bio}</Form.Text>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              About Me
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows="3"
                name="about_me"
                value={fields.about_me}
                onBlur={handleSize}
                onChange={handleChange}
                onFocus={e => {
                  setErrs({ ...errs, [e.target.name]: undefined })
                }}
              />
              <Form.Text className="text-danger">{errs.about_me}</Form.Text>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Hobbies
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                name="hobbies"
                onChange={handleChange}
                defaultValue="Development">
                <option>Development</option>
                <option>Coding</option>
                <option>Designing</option>
                <option>Programming</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Profile Picture
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="file"
                size="sm"
                id="formGridFile"
                name="profile_pic"
                onChange={handleFileOpen}
              />
            </Col>
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSubmit}
            type="submit"
            disabled={flag}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  )
}
export default AboutForm
