import './styles/main.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { Dashboard } from './pages/Dashboard'

import { UserProvider } from './context/UserContext'
import { PrivateRoutes } from './components/PrivateRoutes'

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
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  )
}
export default App
