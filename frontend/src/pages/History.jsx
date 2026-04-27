import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/api'
import PageContainer from '../components/PageContainer'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'
import RiskBadge from '../components/RiskBadge'

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

  return (
    <PageContainer
      title="Analysis History"
      subtitle="Review previously saved URL and screenshot analyses."
    >
      {loading ? (
        <Loader text="Loading history..." />
      ) : history.length === 0 ? (
        <EmptyState
          title="No analyses found"
          description="Run your first analysis to start building history."
        />
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-xl p-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Input type:</span>{' '}
                    {item.inputType}
                  </p>

                  {item.inputType === 'url' ? (
                    <p className="break-all">
                      <span className="font-semibold">Input value:</span>{' '}
                      {item.inputValue}
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">Screenshot:</span>{' '}
                      Uploaded image
                    </p>
                  )}

                  <p>
                    <span className="font-semibold">Risk score:</span>{' '}
                    {item.riskScore}/100
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-3">
                  <RiskBadge level={item.riskLevel} />
                  <Link
                    to="/results"
                    state={{ analysis: item }}
                    className="text-blue-600 underline"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  )
}

export default History
