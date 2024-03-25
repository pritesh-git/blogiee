import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { BASE_URL } from '../config/config'
import Axios from 'axios'

const ProfileSetting = () => {
  const [fields, setFields] = useState({ hobbies: 'Development' })
  const [errs, setErrs] = useState({})
  const [flag, setFlag] = useState(true)
  const [chnges, setChnges] = useState({})
  const [regData, setRegData] = useState({})

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setRegData(JSON.parse(localStorage.getItem('user')))
    } else {
      alert('Login Issue')
      window.location.assign('/')
    }
    const fetchData = async () => {
      const tempData = JSON.parse(localStorage.getItem('user'))
      var id = tempData.data.id
      var headers = { Authorization: tempData.token }
      var url = `${BASE_URL}user/${id}`
      Axios.get(url, { headers: headers })
        .then(res => {
          if (res.data.success) setFields(res.data.data)
        })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [])

  const handleChange = e => {
    e.preventDefault()
    let chnge = chnges
    chnge[e.target.name] = e.target.value
    setChnges(chnge)
    setFields({ ...fields, [e.target.name]: e.target.value })
    setFlag(false)
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
    if (window.confirm('Update Changes ?')) {
      if (
        regData !== undefined &&
        regData !== null &&
        errs.about_me === undefined &&
        errs.bio === undefined
      ) {
        let data = { ...chnges }
        var headers = { Authorization: regData.token }
        var url = BASE_URL + 'updateUser/' + regData.data.id

        Axios.put(url, data, { headers: headers })
          .then(res => {
            if (res.data.success) {
              alert('Updated SuccessFully')
            } else alert(res.data.data.message)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        if (regData === undefined) window.location.assign('/')
      }
    }
  }
  return (
    <div>
      <Form className="p-4 m-5 text-monospace rounded-lg shadow-lg">
        <Form.Group as={Row} controlId="formGridName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="fullName"
              value={fields.fullName}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formGridBio">
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

        <Form.Group as={Row} controlId="formGridAbout">
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

        <Form.Group as={Row} controlId="formGridHobbies">
          <Form.Label column sm="2">
            Hobbies
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              name="hobbies"
              onChange={handleChange}
              value={fields.hobbies}>
              <option>Development</option>
              <option>Coding</option>
              <option>Designing</option>
              <option>Programming</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSubmit}
          type="button"
          disabled={flag}>
          Update Profile
        </Button>
      </Form>
    </div>
  )
}
export default ProfileSetting
