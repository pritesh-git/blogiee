import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { BASE_URL } from '../config/config'
import Axios from 'axios'

const AccountSetting = () => {
  const [err, setErr] = useState('')
  const [token, setToken] = useState('')
  const [changes, setChanges] = useState({})
  const [regData, setRegData] = useState({})

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setToken(JSON.parse(localStorage.getItem('user')).token)
      setRegData(JSON.parse(localStorage.getItem('user')).data)
    } else {
      alert('Login Issue')
      window.location.assign('/')
    }
  }, [])

  const validateEmail = e => {
    e.preventDefault()
    var reg = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    )
    if (reg.test(e.target.value) === false)
      setErr('*Please enter valid Email id')
    else setErr('')
  }
  const handleChange = e => {
    e.preventDefault()
    let chnge = changes
    chnge[e.target.name] = e.target.value
    setChanges(chnge)
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (window.confirm('Change Email Id ?')) {
      if (err === '') {
        let data = { ...changes }
        var headers = { Authorization: token }
        var url = BASE_URL + 'updateUser/' + regData.id
        Axios.put(url, data, { headers: headers })
          .then(res => {
            if (res.data.success) {
              alert('Updated SuccessFully')
            } else alert(res.data.data.message)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
  return (
    <div>
      <Form className="p-4 m-5 text-monospace rounded-lg shadow-lg">
        <Form.Group as={Row} controlId="formGridEmail">
          <Form.Label column sm="1">
            Email
          </Form.Label>
          <Col sm="11">
            {' '}
            <InputGroup>
              <FormControl
                type="email"
                name="email"
                value={regData.email}
                onChange={handleChange}
                onBlur={validateEmail}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  type="submit"
                  onClick={handleSubmit}>
                  Update
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {err ? (
              <Form.Text className="text-danger ml-2">{err}.</Form.Text>
            ) : (
              <Form.Text className="text-muted ml-2">
                After Changing Your Email address,All your account data will be
                loss,You won`t be able to restore the data.
              </Form.Text>
            )}
          </Col>
        </Form.Group>

        <Form.Label className="mt-3 mb-0">Delete Account</Form.Label>
        <Form.Text className="text-muted mb-3 mt-0 pt-0">
          Once you delete your account,there is no going back,Please be certain
        </Form.Text>
        <Button
          variant="danger"
          type="button"
          onClick={() => {
            window.confirm('Delete This Account ?')
          }}>
          Delete Account
        </Button>
      </Form>
    </div>
  )
}

export default AccountSetting
