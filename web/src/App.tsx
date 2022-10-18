import './styles/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Book } from './pages/Book'
import { Signup } from './pages/Signup'
import { Activate } from './pages/Activate'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/activate/:userUuid" element={<Activate />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </Router>
  )
}

export default App
