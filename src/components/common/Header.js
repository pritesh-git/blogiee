import React from 'react'
import '../styles/header.css'
import { Navbar, Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/Profile">PsBloggie</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/Profile">Home</Nav.Link>
        <Nav.Link href="/Blogs">Blogs</Nav.Link>
        <Nav.Link href="/Discover">Discover</Nav.Link>
        <Nav.Link href="/Support">Support</Nav.Link>
        <Nav.Link href="/">Logout</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Header
