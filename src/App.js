import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Discover from './components/Discover'
import Blog from './components/Blog'
import Support from './components/Support'
import AboutForm from './components/AboutForm'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Auth />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Discover" element={<Discover />} />
        <Route path="/Blogs" element={<Blog />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/Registration" element={<AboutForm />} />

        <Route exact path="*" element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App
