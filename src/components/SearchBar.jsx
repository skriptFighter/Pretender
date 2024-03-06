import { IoIosSearch } from "react-icons/io"
import { useDispatch } from "react-redux"
import { searchValue } from "../searchSlice"

function SearchBar() {
 const dispatch = useDispatch()

 const handleChange = (e) => {
  dispatch(searchValue(e.target.value))
 }

 return (
  <div className="flex items-center pl-2 shadow-zinc-700 shadow-sm rounded-lg w-1/4 focus:w-1/2 focus-within:w-1/2 transition-all duration-300">
   <IoIosSearch fontSize={23} className="cursor-pointer" />
   <input
    type="text"
    className="outline-none dark:bg-black w-full p-2"
    onChange={handleChange}
   />
  </div>
 )
}

export default SearchBar
