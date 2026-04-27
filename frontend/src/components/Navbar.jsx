import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Dark Pattern Detector
        </Link>

        <div className="flex flex-wrap gap-4 items-center text-sm md:text-base">
          {user ? (
            <>
              <Link to="/analyze-url" className="hover:text-slate-300">
                Analyze URL
              </Link>
              <Link to="/analyze-screenshot" className="hover:text-slate-300">
                Analyze Screenshot
              </Link>
              <Link to="/history" className="hover:text-slate-300">
                History
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-slate-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-slate-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
