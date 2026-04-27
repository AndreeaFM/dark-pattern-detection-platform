function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="text-slate-600 text-lg font-medium">{text}</div>
    </div>
  )
}

export default Loader
