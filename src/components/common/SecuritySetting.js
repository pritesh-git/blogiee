import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { BASE_URL } from '../config/config'

const SecuritySetting = () => {
  const [data, setData] = useState({})
  const [err, setErr] = useState({})

  const validateData = () => {
    var errs = {}
    var isValid = true
    if (!data.oldPassword || data.oldPassword.length < 5) {
      errs.oldPass = '*Please Enter 5 digit Old Password'
      isValid = false
    }
    if (!data.newPassword || data.newPassword.length < 5) {
      errs.newPass = '*Please Enter 5 digit New Password'
      isValid = false
    }
    if (!data.newPassword1 || data.newPassword1.length < 5) {
      errs.newPass1 = '*Please Enter 5 digit Confirm Password'
      isValid = false
    }
    if (
      data.newPassword &&
      data.newPassword1 &&
      data.newPassword !== data.newPassword1
    ) {
      errs.newPass1 = '*Confirm Password Not Match!!!'
      isValid = false
    }
    setErr(errs)
    return isValid
  }

  const handleChange = e => {
    e.preventDefault()
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleUpdate = e => {
    e.preventDefault()
    if (validateData()) {
      var tempData = JSON.parse(localStorage.getItem('user'))
      var url = BASE_URL + 'changePassword/' + tempData.data.id
      var headers = { Authorization: tempData.token }
      Axios.put(url, data, { headers: headers })
        .then(res => {
          if (res.data.success) alert(res.data.data.message)
          else alert(res.data.data.message)
          setData({})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <div>
      <Form className="p-4 m-5 rounded-lg shadow-lg">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Change Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter old password"
            name="oldPassword"
            onChange={handleChange}
          />
          <Form.Text className="text-danger mt-0 mb-2">{err.oldPass}</Form.Text>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            name="newPassword"
            onChange={handleChange}
          />
          <Form.Text className="text-danger mt-0 mb-2">{err.newPass}</Form.Text>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            name="newPassword1"
            onChange={handleChange}
          />
          <Form.Text className="text-danger mt-0 mb-2">
            {err.newPass1}
          </Form.Text>
          <Button
            variant="outline-primary"
            type="button"
            onClick={handleUpdate}>
            Change Password
          </Button>
        </Form.Group>
        <Form.Group controlId="formBasicAuth">
          <Form.Label className="d-block">Two Factor Authentication</Form.Label>
          <Button
            variant="info"
            type="button"
            onClick={() => {
              alert('this Feature is non functional at the moment')
            }}>
            Enable two-factor authentication
          </Button>
          <Form.Text className="text-muted">
            Two factor authentication adds an additional layer of security to
            your account by requiring more than just a password to log in.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicSession">
          <Form.Label className="d-block mb-0">Sessions</Form.Label>
          <Form.Text className="text-muted mt-0">
            This is a list of devices that have logged into your account.Revoke
            any session that you donot recognize.
          </Form.Text>
        </Form.Group>
        <ListGroup>
          <ListGroup.Item>
            <h6 className="mb-0 pb-0">Indore 34.2324° N,77.3434° E</h6>
            <small className="text-muted mt-0 mb-2 d-block">
              Your current session seen in Indore
            </small>
            <Button
              variant="outline-info"
              onClick={() => {
                alert('this Feature is non functional at the moment')
              }}>
              More Info
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <h6 className="mb-0 pb-0">Indore 34.2324° N,77.3434° E</h6>
            <small className="text-muted mt-0 mb-2 d-block">
              Your last session seen in Indore
            </small>
            <Button
              variant="outline-info"
              onClick={() => {
                alert('this Feature is non functional at the moment')
              }}>
              More Info
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Form>
    </div>
  )
}
export default SecuritySetting
