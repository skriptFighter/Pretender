function Input({ htmlForId, placeholder, label, type, register, error }) {
 return (
  <div className="flex flex-col gap-2 px-2 w-full">
   <label
    htmlFor={htmlForId}
    className="capitalize font-semibold text-sm md:text-md"
   >
    {label}
   </label>

   <input
    type={type}
    id={htmlForId}
    placeholder={placeholder}
    {...register}
    className="text-sm sm:text-md bg-gray-50 text-gray-700 border-gray-300 focus:outline-none focus:ring focus:border-gray-700 rounded py-1 px-2"
   />

   <p className="text-sm sm:text-md  text-red-400 font-semibold">
    {error && error}
   </p>
  </div>
 )
}

export default Input
