function Header() {
 return (
  <div className="flex justify-between items-center">
   <button>
    <svg
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     strokeWidth={1.5}
     stroke="currentColor"
     className="w-6 h-6"
    >
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
     />
    </svg>
   </button>

   <div>Pretender</div>

   <div className="flex items-center gap-5">
    <img
     src="https://i.pravatar.cc/200"
     alt=""
     className="w-10 h-10 rounded-full"
    />
    <p>John Doe</p>
    <button className="">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
     </svg>
    </button>

    <button className="flex gap-2">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
     </svg>
    </button>
   </div>
  </div>
 )
}

export default Header
