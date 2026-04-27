function PageContainer({ title, subtitle, children }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {title && <h1 className="text-3xl font-bold mb-2">{title}</h1>}
      {subtitle && <p className="text-slate-600 mb-6">{subtitle}</p>}
      {children}
    </div>
  )
}

export default PageContainer
