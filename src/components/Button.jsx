function Button({ type, className, children }) {
 return (
  <button
   type={type}
   className={`bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded w-full ${className}`}
  >
   {children}
  </button>
 )
}

export default Button
