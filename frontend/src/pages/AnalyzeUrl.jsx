import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

function AnalyzeUrl() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter a valid URL.')
      return
    }

    try {
      setLoading(true)

      const { data } = await API.post('/analysis/url', { url })

      navigate('/results', { state: { analysis: data } })
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to analyze the provided URL.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4">Analyze URL</h1>
        <p className="text-slate-600 mb-6">
          Enter a webpage URL to detect possible dark patterns.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white px-6 py-3 rounded hover:bg-slate-800"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AnalyzeUrl
