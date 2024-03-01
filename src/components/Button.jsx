function Button({ type, onClick, className, children }) {
 return (
  <button
   onClick={onClick}
   type={type}
   className={`bg-black text-white hover:bg-gray-900 font-semibold py-2 px-4 rounded w-full ${className}`}
  >
   {children}
  </button>
 )
}

export default Button
