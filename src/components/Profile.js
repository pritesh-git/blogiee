import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BASE_URL } from './config/config'
import './styles/layout.css'
import Header from './common/Header'
import SideBar from './common/SideBar'
import BlogLayout from './common/BlogLayout'
import { Container, Row, Col } from 'react-bootstrap'
import ProfileSetting from './common/ProfileSetting'
import AccountSetting from './common/AccountSetting'
import SecuritySetting from './common/SecuritySetting'
import NotificationSetting from './common/NotificationSetting'
import PaymentSetting from './common/PaymentSetting'
import UserCircles from './common/UserCircles'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('1')
  const [fields, setFields] = useState({})

  useEffect(() => {
    var tempID = JSON.parse(localStorage.getItem('user')).data.id
    const fetchData = async () => {
      await fetch(`${BASE_URL}users/${tempID}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).token,
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            setFields(res.data)
          }
        })
        .catch(err => console.log(err))
    }
    fetchData()
  }, [])

  const selectedTab = val => {
    setActiveTab(val)
  }

  return (
    <>
      <Header />
      <Container fluid className="mt-5 pt-2">
        <Row>
          <Col
            sm={2}
            className="bg-dark text-white"
            style={{ minHeight: '93vh' }}>
            <SideBar info={fields} TabClick={e => selectedTab(e)} />
          </Col>
          <Col sm={10}>
            {activeTab === '1' ? (
              <BlogLayout />
            ) : activeTab === '2.1' ? (
              <UserCircles activeId="1" />
            ) : activeTab === '2.2' ? (
              <UserCircles activeId="2" />
            ) : activeTab === '3' ? (
              <ProfileSetting />
            ) : activeTab === '4' ? (
              <AccountSetting />
            ) : activeTab === '5' ? (
              <SecuritySetting />
            ) : activeTab === '6' ? (
              <NotificationSetting />
            ) : activeTab === '7' ? (
              <PaymentSetting />
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Profile
