import { IoIosSearch } from "react-icons/io"
import { useDispatch } from "react-redux"
import { setSearchValue } from "../notesSlice"

function SearchBar() {
 const dispatch = useDispatch()

 const handleChange = (e) => {
  dispatch(setSearchValue(e.target.value))
 }

 return (
  <div className="flex w-1/4  items-center rounded-xl bg-secondary pl-2 transition-all duration-300 focus-within:w-1/2 focus:w-1/2 focus:bg-primary dark:bg-secondaryDark focus:dark:bg-primaryDark">
   <IoIosSearch fontSize={23} className="cursor-pointer" />
   <input
    type="text"
    className="w-full bg-secondary p-4 outline-none transition-all duration-300 focus:bg-primary dark:bg-secondaryDark focus:dark:bg-primaryDark"
    onChange={handleChange}
   />
  </div>
 )
}

export default SearchBar
