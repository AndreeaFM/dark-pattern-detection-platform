import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageContainer from '../components/PageContainer'

function Register() {
  const navigate = useNavigate()
  const { register, loading } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = await register(formData)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <PageContainer>
      <div className="min-h-[70vh] flex justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Register</h2>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded hover:bg-slate-800"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

          <p className="mt-4 text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </PageContainer>
  )
}

export default Register
