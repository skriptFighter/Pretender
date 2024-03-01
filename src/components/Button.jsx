function Button({ type, className, children }) {
 return (
  <button
   type={type}
   className={`bg-black text-white hover:bg-gray-900 font-semibold py-2 px-4 rounded w-full ${className}`}
  >
   {children}
  </button>
 )
}

export default Button
