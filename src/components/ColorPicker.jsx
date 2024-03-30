// import { useUpdateBgColor } from "../hooks/useUpdateBgColor"
import { useClickOutside } from "../hooks/useClickOutside"
import { useSelector } from "react-redux"
import { selectDark } from "../notesSlice"

const colors = [
 { id: 1, light: "#ffd8d9", dark: "#0d63f1" },
 { id: 11, light: "#ffd811", dark: "#0dddf1" },
 { id: 2, light: "#fff0f5" },
 { id: 3, light: "#EDE0E7" },
 { id: 4, light: "#c2e0f0" },
 { id: 5, light: "#dce7f7" },
 { id: 6, light: "#dcedc8" },
 { id: 7, light: "#d9f7be" },
 { id: 8, light: "#D9E1C1" },
 { id: 9, light: "#F2EAE0 " },
 { id: 10, light: "#F8F4F1 " },
]

function ColorPicker({ id, setIsPickerOpen, setSelectedColor }) {
 //setSelectedColor is for edit note bgColor

 //  const { updateBgColor } = useUpdateBgColor()
 const ref = useClickOutside(() => setIsPickerOpen(null))

 //add ,id here =====================================↓
 function updateWithSelected({ color: { light, dark } }) {
  setSelectedColor({ light, dark })
  // updateBgColor({ color, id })
 }

 function handleColorChange({ color }) {
  setIsPickerOpen(null)
  updateWithSelected({ color, id })
  // setSelectedColor
  //  ? updateWithSelected({ color, id })
  //  : updateBgColor({ color, id })
 }

 const isDark = useSelector(selectDark)

 return (
  <div
   className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center justify-between gap-3 rounded-xl bg-white px-4 py-2 shadow-md shadow-black "
   ref={ref}
  >
   {colors.map((color) => (
    <div
     key={color.id}
     onClick={() => handleColorChange({ color })}
     style={{ backgroundColor: isDark ? color.dark : color.light }}
     className="h-7 w-7 cursor-pointer rounded-full transition-all duration-300 hover:scale-125"
    />
   ))}
  </div>
 )
}

export default ColorPicker
