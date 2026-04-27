function RiskBadge({ level }) {
  const styles = {
    Low: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    High: 'bg-red-100 text-red-700',
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        styles[level] || 'bg-slate-100 text-slate-700'
      }`}
    >
      {level}
    </span>
  )
}

export default RiskBadge
