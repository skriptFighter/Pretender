function Button({
 type,
 onClick,
 className,
 primary,
 secondary,
 round,
 children,
}) {
 return (
  <button
   onClick={onClick}
   type={type}
   className={` text-sm md:text-md font-semibold grid place-items-center 
   ${primary && "text-white bg-black dark:bg-gray-950 hover:bg-gray-900 dark:hover:bg-gray-700 rounded w-full py-2 px-4 "}
   ${secondary && "text-black dark:text-gray-950 bg-slate-50  dark:bg-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-50 rounded w-full py-2 px-4"}
   ${round && "text-white bg-black dark:bg-gray-950 hover:bg-gray-900 dark:hover:bg-gray-700 rounded-full w-10 h-10 p-0"}
   ${className}
   `}
  >
   {children}
  </button>
 )
}

export default Button
