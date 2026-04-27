import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageContainer from '../components/PageContainer'

function Home() {
  const { user } = useAuth()

  return (
    <PageContainer>
      <div className="min-h-[75vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Dark Pattern Detection Platform
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mb-8">
          A web-based system designed to detect manipulative design patterns in
          online interfaces using rule-based analysis.
        </p>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl w-full mb-10">
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Analyze URLs</h3>
            <p className="text-slate-600 text-sm">
              Submit a webpage URL and detect possible dark patterns.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Analyze Screenshots</h3>
            <p className="text-slate-600 text-sm">
              Upload interface screenshots and extract suspicious text with OCR.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">View History</h3>
            <p className="text-slate-600 text-sm">
              Review previous analyses and compare results over time.
            </p>
          </div>
        </div>

        {user ? (
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/analyze-url"
              className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800"
            >
              Analyze URL
            </Link>
            <Link
              to="/analyze-screenshot"
              className="border border-slate-900 px-6 py-3 rounded-lg hover:bg-slate-100"
            >
              Analyze Screenshot
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
    </PageContainer>
  )
}

export default Home
