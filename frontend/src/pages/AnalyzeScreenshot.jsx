import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'
import PageContainer from '../components/PageContainer'

function AnalyzeScreenshot() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setImage(selectedFile)

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!image) {
      setError('Please upload an image.')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', image)

      const { data } = await API.post('/analysis/screenshot', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      navigate('/results', { state: { analysis: data } })
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to analyze screenshot.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer
      title="Analyze Screenshot"
      subtitle="Upload an interface screenshot and analyze extracted text for dark patterns."
    >
      <div className="bg-white shadow rounded-xl p-6 max-w-3xl">
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-3 rounded mb-4"
          />

          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-80 rounded-lg border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white px-6 py-3 rounded hover:bg-slate-800"
          >
            {loading ? 'Analyzing...' : 'Analyze Screenshot'}
          </button>
        </form>
      </div>
    </PageContainer>
  )
}

export default AnalyzeScreenshot
