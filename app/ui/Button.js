function Button({ extra, children, onClick}) {
  return (
    <button
      className={`py-3 px-6 rounded-full ${extra}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
