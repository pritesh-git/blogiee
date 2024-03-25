import React, { useState, useEffect } from 'react'
import Header from './Header'
import { BASE_URL } from '../config/config'
import { IoIosThumbsUp, IoIosText, IoIosSend } from 'react-icons/io'
import { Button, Modal, Card, Badge } from 'react-bootstrap'
import Axios from 'axios'

const UserCircles = props => {
  const [Details, setDetails] = useState({ followers: [], following: [] })
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalVal, setModalVal] = useState({})
  const [fStatus, setFstatus] = useState(false)

  var openModal = async (val = '') => {
    if (val !== '') {
      var temp = false
      Details.following.forEach(element => {
        if (element.user_id == val) {
          temp = true
        }
      })
      setFstatus(temp)
      await fetch(`${BASE_URL}userCircle/${val}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            setModalVal(res.data)
            setIsOpen(!modalIsOpen)
          }
        })
        .catch(err => console.log(err))
    } else {
      setIsOpen(!modalIsOpen)
    }
  }
  var toggleFollow = () => {
    setFstatus(!fStatus)
    var temp = JSON.parse(localStorage.getItem('user')).data
    var data = {
      following: {
        user_id: modalVal._id,
        user_pic: modalVal.profile_pic,
        user_name: modalVal.fullName,
      },
      followers: {
        user_id: temp.id,
        user_pic: temp.profile_pic,
        user_name: temp.fullName,
      },
      status: fStatus,
    }
    Axios.put(`${BASE_URL}updateMyCircle`, data, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      },
    })
      .then(res => {
        setDetails(res.data.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `${BASE_URL}myCircle/${
          JSON.parse(localStorage.getItem('user')).data.id
        }`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).token,
          },
        },
      )
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            setDetails(res.data)
          }
        })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [])

  return (
    <div className="m-5 text-monospace">
      <Header />
      <h2 className="mt-5">
        {props.activeId == '1' ? 'Followers' : 'Following'}{' '}
      </h2>
      <div className="d-flex justify-content-between">
        <div className="row w-100">
          {props.activeId == '1'
            ? Details.followers.map((val, i) => (
                <div
                  id={i}
                  key={i}
                  className="shadow-lg card m-2 p-1 d-flex align-items-end flex-column"
                  style={{ maxHeight: '150px', maxWidth: '180px' }}>
                  <img
                    className="card-img-top w-100 h-100 rounded-lg align-self-center"
                    src={
                      val.user_pic
                        ? BASE_URL + val.user_pic
                        : 'https://picsum.photos/seed/picsum/100/50'
                    }
                    alt="Click to load"
                  />
                  <div
                    className="card-img-overlay mt-auto p-1 m-1"
                    style={{
                      opacity: '0.9',
                      background: '#fff',
                      maxHeight: '15%',
                    }}>
                    <h5
                      className="card-title m-0 text-truncate"
                      onClick={() => {
                        openModal(val.user_id)
                      }}>
                      {val.user_name}
                    </h5>
                  </div>
                </div>
              ))
            : Details.following.map((val, i) => (
                <div
                  id={i}
                  key={i}
                  className="shadow-lg card m-2 p-1 d-flex align-items-end flex-column"
                  style={{ maxHeight: '150px', maxWidth: '180px' }}>
                  <img
                    className="card-img-top w-100 h-100 rounded-lg align-self-center"
                    src={
                      val.user_pic
                        ? BASE_URL + val.user_pic
                        : 'https://picsum.photos/seed/picsum/100/50'
                    }
                    alt="Click to load"
                  />
                  <div
                    className="card-img-overlay mt-auto p-1 m-1"
                    style={{
                      opacity: '0.9',
                      background: '#fff',
                      maxHeight: '15%',
                    }}>
                    <h5
                      className="card-title m-0 text-truncate"
                      onClick={() => {
                        openModal(val.user_id)
                      }}>
                      {val.user_name}
                    </h5>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <Modal show={modalIsOpen} onHide={openModal} animation={false} centered>
        <Modal.Body>
          <Card>
            <Card.Img variant="top" src={BASE_URL + modalVal.profile_pic} />
            <Card.Body>
              <Card.Title>
                {modalVal.fullName}{' '}
                <Button
                  variant="outline-primary"
                  className="float-right"
                  onClick={toggleFollow}>
                  {fStatus ? 'Following' : 'Follow'}
                </Button>
              </Card.Title>
              <Card.Text>
                <strong>Bio: </strong> {modalVal.bio}
              </Card.Text>
              <Card.Text>
                <strong>About: </strong> {modalVal.about_me}
              </Card.Text>
              <Card.Text className="d-flex justify-content-between flex-wrap">
                <Badge pill variant="info" className="p-2 m-1">
                  {modalVal.userCircle !== undefined &&
                  modalVal.userCircle !== null &&
                  modalVal.userCircle.followers !== undefined
                    ? modalVal.userCircle.followers.length
                    : '0'}{' '}
                  Follower
                </Badge>
                <Badge pill variant="info" className="p-2 m-1">
                  {modalVal.userCircle !== undefined &&
                  modalVal.userCircle !== null &&
                  modalVal.userCircle.following !== undefined
                    ? modalVal.userCircle.following.length
                    : '0'}{' '}
                  Following
                </Badge>
                <Badge pill variant="info" className="p-2 m-1">
                  <IoIosThumbsUp /> 0
                </Badge>
                <Badge pill variant="info" className="p-2 m-1">
                  <IoIosText /> 0
                </Badge>
                <Badge pill variant="info" className="p-2 m-1">
                  <IoIosSend /> 0
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UserCircles
