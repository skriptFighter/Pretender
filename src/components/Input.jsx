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
    className="text-sm sm:text-md bg-white dark:bg-zinc-900  dark:text-stone-300 text-black border-gray-300 focus:outline-none focus:ring focus:border-gray-900 rounded p-2"
   />

   <p className="text-sm sm:text-md  text-red-400 dark:text-red-500 font-semibold">
    {error && error}
   </p>
  </div>
 )
}

export default Input
