import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AnalyzeUrl from './pages/AnalyzeUrl'
import AnalyzeScreenshot from './pages/AnalyzeScreenshot'
import Results from './pages/Results'
import History from './pages/History'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/analyze-url"
          element={
            <ProtectedRoute>
              <AnalyzeUrl />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analyze-screenshot"
          element={
            <ProtectedRoute>
              <AnalyzeScreenshot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
