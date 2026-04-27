function EmptyState({ title, description }) {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

export default EmptyState
