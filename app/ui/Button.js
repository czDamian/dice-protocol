function Button({extra, children}) {
  return (
    <button className={`py-3 px-6 rounded-full ${extra}`}>
{children}
    </button>
  )
}

export default Button
