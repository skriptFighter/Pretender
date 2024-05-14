function Button({
 type,
 onClick,
 className,
 primary,
 secondary,
 round,
 header,
 children,
}) {
 return (
  <button
   onClick={onClick}
   type={type}
   className={` md:text-md grid place-items-center text-sm font-semibold 
   ${primary && "w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-900 dark:bg-gray-950 dark:hover:bg-gray-700 "}
   ${secondary && "w-full rounded bg-slate-50  px-4 py-2 text-black hover:bg-slate-200 dark:bg-zinc-300 dark:text-gray-950 dark:hover:bg-zinc-50"}
   ${round && "h-10 w-10 rounded-full bg-black p-0 text-white hover:bg-gray-900 dark:bg-gray-950 dark:hover:bg-gray-700"}
   ${header && " rounded-full p-2 hover:bg-tertiary dark:hover:bg-tertiaryDark"}
   ${className}
   `}
  >
   {children}
  </button>
 )
}

export default Button
