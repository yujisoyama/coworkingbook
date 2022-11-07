import './styles/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { Dashboard } from './pages/Dashboard'

import { UserProvider } from './context/UserContext'

function App() {
  return (
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </UserProvider>
  )
}
export default App
