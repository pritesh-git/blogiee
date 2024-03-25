import React, { useState, useEffect } from 'react'
import Header from './common/Header'
import { BASE_URL } from './config/config'
import { IoIosThumbsUp, IoIosText, IoIosSend } from 'react-icons/io'
import { Button, Modal, Card, Badge } from 'react-bootstrap'
import Axios from 'axios'

const Discover = () => {
  const [Details, setDetails] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalVal, setModalVal] = useState({})
  const [fStatus, setFstatus] = useState(false)
  const user = JSON.parse(localStorage.getItem('user')).data || {}

  var openModal = (val = {}) => {
    if (val != {} && val.userCircle != undefined) {
      var temp = false
      val.userCircle.followers.forEach(e => {
        if (e.user_id == user.id) temp = true
      })
      setFstatus(temp)
      setModalVal(val)
    }
    setIsOpen(!modalIsOpen)
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
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${BASE_URL}users`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      })
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
    <div style={{ background: '#cff' }} className="main">
      <Header />
      <div className="d-flex justify-content-between">
        <div className="row w-100 m-2 mt-5">
          {Details.map((val, i) =>
            user !== {} && user.id !== val._id ? (
              <div
                id={i}
                key={i}
                className="shadow-lg card m-2 p-1 d-flex align-items-end flex-column"
                style={{ minHeight: '250px', minWidth: '250px' }}>
                <img
                  className="card-img-top w-100 h-100 rounded-lg align-self-center"
                  src={
                    val.profile_pic
                      ? BASE_URL + val.profile_pic
                      : 'https://picsum.photos/seed/picsum/100/50'
                  }
                  alt="Click to load"
                />
                <div
                  className="card-img-overlay mt-auto p-1 m-1"
                  style={{
                    opacity: '0.8',
                    background: '#fff',
                    maxHeight: '40%',
                  }}>
                  <h4
                    className="card-title m-0 text-truncate"
                    onClick={() => {
                      openModal(val)
                    }}>
                    {val.fullName}
                  </h4>
                  <p className="card-text m-0 mt-1 d-flex justify-content-between flex-wrap">
                    <span className="badge flex-fill badge-info mb-0 mr-1 p-2">
                      {val.userCircle !== undefined &&
                      val.userCircle !== null &&
                      val.userCircle.followers !== undefined
                        ? val.userCircle.followers.length
                        : '0'}{' '}
                      Follower
                    </span>
                    <span className="badge flex-fill badge-info mb-0 ml-1 p-2">
                      {val.userCircle !== undefined &&
                      val.userCircle !== null &&
                      val.userCircle.following !== undefined
                        ? val.userCircle.following.length
                        : '0'}{' '}
                      Following
                    </span>
                  </p>
                  <p className="card-text m-0 d-flex justify-content-between flex-wrap">
                    <span className="badge flex-fill badge-info m-1 mt-0 p-1">
                      <IoIosThumbsUp /> 0
                    </span>
                    <span className="badge flex-fill badge-info m-1 mt-0 p-1">
                      <IoIosText /> 0
                    </span>
                    <span className="badge flex-fill badge-info m-1 mt-0 p-1">
                      <IoIosSend /> 0
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              ''
            ),
          )}
        </div>
      </div>
      <Modal show={modalIsOpen} onHide={openModal} animation={false} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Img
              variant="top"
              src={
                modalVal.profile_pic
                  ? BASE_URL + modalVal.profile_pic
                  : 'https://picsum.photos/seed/picsum/100/50'
              }
            />
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

export default Discover
