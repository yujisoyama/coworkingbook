import './styles/main.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { Book } from './pages/Book'
import { Signup } from './pages/Signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </Router>
  )
}

export default App
