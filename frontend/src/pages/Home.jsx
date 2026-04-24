import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Dark Pattern Detection Platform
      </h1>

      <p className="text-lg text-slate-600 max-w-2xl mb-8">
        Detect manipulative design patterns in online interfaces using
        rule-based analysis.
      </p>

      {user ? (
        <div className="flex gap-4">
          <Link
            to="/analyze-url"
            className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800"
          >
            Analyze URL
          </Link>
          <Link
            to="/history"
            className="border border-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100"
          >
            View History
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home
