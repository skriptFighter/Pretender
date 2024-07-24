function Input({
 htmlForId,
 placeholder,
 label,
 type,
 register,
 error,
 defaultValue,
}) {
 return (
  <div className="flex w-full flex-col gap-2 px-2">
   <label
    htmlFor={htmlForId}
    className="md:text-md text-sm font-semibold capitalize"
   >
    {label}
   </label>

   <input
    type={type}
    id={htmlForId}
    defaultValue={defaultValue}
    placeholder={placeholder}
    {...register}
    className="sm:text-md rounded border-gray-300 bg-white  p-2 text-sm text-black focus:border-gray-900 focus:outline-none focus:ring dark:bg-zinc-900 dark:text-stone-300"
   />

   <p className="sm:text-md text-sm  font-semibold text-red-400 dark:text-red-500">
    {error && error}
   </p>
  </div>
 )
}

export default Input
