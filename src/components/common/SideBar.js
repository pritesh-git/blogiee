import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, NavDropdown, Image, Container, Row, Col } from 'react-bootstrap'
import { BASE_URL } from '../config/config'
const SideBar = props => {
  return (
    <>
      <Container fluid className="mb-3 mt-3">
        <Row>
          <Col sm={3} className="mr-1">
            <Image
              src={
                props.info.profile_pic
                  ? BASE_URL + props.info.profile_pic
                  : 'https:mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg'
              }
              width="50px"
              rounded
            />
          </Col>
          <Col sm={8} className="ml-1">
            {props.info !== undefined ? props.info.fullName : ''}
          </Col>
        </Row>
      </Container>
      <Nav
        variant="pills"
        defaultActiveKey="1"
        onSelect={e => {
          props.TabClick(e)
        }}
        className="flex-column">
        <Nav.Link eventKey="1">Blogs</Nav.Link>
        {/* <Nav.Link eventKey="2">My Circle</Nav.Link> */}
        <NavDropdown title="My Circle">
          <NavDropdown.Item eventKey="2.1">Followers</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="2.2">Following</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link eventKey="3">Profile Setting</Nav.Link>
        <Nav.Link eventKey="4">Account Setting</Nav.Link>
        <Nav.Link eventKey="5">Security Setting</Nav.Link>
        <Nav.Link eventKey="6">Notification</Nav.Link>
        <Nav.Link eventKey="7">Payments</Nav.Link>
      </Nav>
    </>
  )
}

export default SideBar
