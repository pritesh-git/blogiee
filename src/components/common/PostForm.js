import React, { useState } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import { BASE_URL } from '../config/config'
import Axios from 'axios'

const PostForm = () => {
  const [show, setShow] = useState(false)
  const [file, setFile] = useState(null)
  const [err, setErr] = useState({ title: '', content: '' })
  const [fields, setFields] = useState({ title: '', content: '' })

  const handleFile = e => {
    e.preventDefault()
    setFile(e.target.files[0])
  }
  const handleChange = e => {
    e.preventDefault()
    setFields({ ...fields, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (err.title === '' || err.content === '') {
      var tempData = JSON.parse(localStorage.getItem('user'))
      const data = new FormData()
      data.append('post_img', file)
      data.append('title', fields.title)
      data.append('content', fields.content)
      data.append('fullName', tempData.data.fullName)
      data.append(
        'profile_pic',
        'https://mdbootstrap.com/img/Photos/Avatars/img%20(5).jpg',
      )

      var url = BASE_URL + 'post/' + tempData.data.id
      var headers = { Authorization: tempData.token }
      Axios.post(url, data, { headers: headers })
        .then(res => {
          if (res.data.success) alert('Updated SuccessFully')
          else alert(res.data.data.message)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  const handleModel = () => {
    setShow(!show)
  }
  const handleSize = e => {
    e.preventDefault()
    var errs = err
    if (e.target.value.length < 10)
      errs[e.target.name] = '*Please Enter at least 10 letters'

    if (e.target.value.length > 250)
      errs[e.target.name] = '*Please Enter at most 250 letters'

    if (e.target.value.length > 10 && e.target.value.length < 250)
      errs[e.target.name] = ''

    setErr(errs)
  }
  return (
    <div className="w-100 text-right p-4 pr-5">
      <Button
        variant="info"
        onClick={handleModel}
        style={{ borderRadius: '50%', fontSize: '40px' }}
        className="text-light shadow-lg pt-0 pl-3 pr-3">
        +
      </Button>

      <Modal show={show} onHide={handleModel} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextTitle">
              <Form.Label column sm="3">
                Post Title
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="title"
                  value={fields.title}
                  onBlur={handleSize}
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">{err.title}</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextContent">
              <Form.Label column sm="3">
                Post Content
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="textarea"
                  rows="2"
                  onBlur={handleSize}
                  placeholder="Enter your awesome post"
                  value={fields.content}
                  name="content"
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">{err.content}</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextPicture">
              <Form.Label column sm="3">
                Post Picture
              </Form.Label>
              <Col sm="9">
                <Form.File id="exampleFormControlFile1" onChange={handleFile} />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={handleModel}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PostForm
