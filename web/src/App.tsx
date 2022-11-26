import './styles/main.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'

import { UserProvider } from './context/UserContext'
import { PrivateRoutes } from './components/PrivateRoutes'
import { Profile } from './pages/Profile'
import { SignUp } from './pages/Signup'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoutes />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  )
}
export default App
