import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/api'

function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get('/analysis/history')
        setHistory(data)
      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) {
    return <div className="p-6">Loading history...</div>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analysis History</h1>

      {history.length === 0 ? (
        <p className="text-slate-600">No saved analyses found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-xl p-5">
              <p className="mb-1">
                <span className="font-semibold">Input type:</span>{' '}
                {item.inputType}
              </p>
              <p className="mb-1 break-all">
                <span className="font-semibold">Input value:</span>{' '}
                {item.inputValue}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Risk score:</span>{' '}
                {item.riskScore}/100
              </p>
              <p className="mb-3">
                <span className="font-semibold">Risk level:</span>{' '}
                {item.riskLevel}
              </p>

              <Link
                to="/results"
                state={{ analysis: item }}
                className="text-blue-600 underline"
              >
                View details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History
