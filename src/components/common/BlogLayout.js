import { Card } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../config/config'
import Axios from 'axios'
import PostForm from './PostForm'

const BlogLayout = () => {
  const [postList, setPostList] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      alert('Login Issue')
      window.location.assign('/')
    }
    const fetchData = async () => {
      var id = JSON.parse(localStorage.getItem('user')).data.id
      var headers = {
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      }
      var url = `${BASE_URL}userPost/${id}`
      Axios.get(url, { headers: headers })
        .then(res => {
          if (res.data.success) {
            setPostList(res.data.data)
          }
        })
        .catch(console.log)
    }
    fetchData()
  }, [])

  const setData = (val, i) => {
    var tempStr = ''
    let tempSwitch = val.post_img
      ? Math.floor(Math.random() * (8 - 5)) + 5
      : Math.floor(Math.random() * 5)

    var tempImg = ''

    if (val.post_img) tempImg = BASE_URL + val.post_img //temp image value till fix image issue

    switch (tempSwitch) {
      case 0: {
        tempStr = (
          <Card key={i} className="p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>{val.content}</p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous in{' '}
                  <cite title="Source Title">{val.title}</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
        )
        break
      }
      case 1: {
        tempStr = (
          <Card key={i} bg="primary" text="white" className="text-center p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>{val.content}</p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous in{' '}
                  <cite title="Source Title">{val.title}</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
        )
        break
      }
      case 2: {
        tempStr = (
          <Card key={i} className="text-center">
            <Card.Body>
              <Card.Title>{val.title}</Card.Title>
              <Card.Text>{val.content}</Card.Text>
              <Card.Text>
                <small className="text-muted">{val.updatedAt}</small>
              </Card.Text>
            </Card.Body>
          </Card>
        )
        break
      }
      case 3: {
        tempStr = (
          <Card key={i} className="text-right">
            <blockquote className="blockquote mb-0 card-body">
              <p>{val.content}</p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous in{' '}
                  <cite title="Source Title">{val.title}</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
        )
        break
      }
      case 4: {
        tempStr = (
          <Card key={i}>
            <Card.Body>
              <Card.Title>{val.title}</Card.Title>
              <Card.Text>{val.content}</Card.Text>
              <Card.Text>
                <small className="text-muted">{val.updatedAt}</small>
              </Card.Text>
            </Card.Body>
          </Card>
        )
        break
      }
      case 5: {
        tempStr = (
          <Card key={i}>
            <Card.Img
              variant="top"
              src={tempImg}
              style={{ width: '100%', height: '25vh' }}
            />
            <Card.Body>
              <Card.Title>{val.title}</Card.Title>
              <Card.Text>{val.content}</Card.Text>
            </Card.Body>
          </Card>
        )
        break
      }
      case 6: {
        tempStr = (
          <Card key={i}>
            <Card.Img
              variant="top"
              src={tempImg}
              style={{ width: '100%', height: '25vh' }}
            />
            <Card.Body>
              <Card.Title>{val.title}</Card.Title>
              <Card.Text>{val.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{val.updatedAt}</small>
            </Card.Footer>
          </Card>
        )
        break
      }
      case 7: {
        tempStr = (
          <Card key={i}>
            <Card.Img src={tempImg} style={{ width: '100%', height: '40vh' }} />
          </Card>
        )
        break
      }
      default: {
        tempStr = ''
        break
      }
    }
    return tempStr
  }
  return (
    <div>
      <PostForm />
      <Card>
        {postList !== null && postList[0] !== undefined
          ? postList.map((val, i) => setData(val, i))
          : ''}
      </Card>
    </div>
  )
}
export default BlogLayout
