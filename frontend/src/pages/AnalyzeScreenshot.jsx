import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

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
    <div className="min-h-[80vh] flex justify-center items-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4">Analyze Screenshot</h1>
        <p className="text-slate-600 mb-6">
          Upload a screenshot to detect possible dark patterns based on
          extracted text.
        </p>

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
    </div>
  )
}

export default AnalyzeScreenshot
