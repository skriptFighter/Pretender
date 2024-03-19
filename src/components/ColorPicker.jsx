import { useUpdateBgColor } from "../hooks/useUpdateBgColor"
import { useClickOutside } from "../hooks/useClickOutside"

const colors = [
 { id: 1, color: "#f44336" },
 { id: 2, color: "#0693e3" },
 { id: 3, color: "#00d084" },
 { id: 4, color: "#ffeb3b" },
 { id: 5, color: "#b279d2" },
 { id: 6, color: "#ff6900" },
 { id: 7, color: "#e91e63" },
]

function ColorPicker({ id, setIsPickerOpen, setSelectedColor }) {
 //setSelectedColor is for edit note

 const { updateBgColor } = useUpdateBgColor()
 const ref = useClickOutside(() => setIsPickerOpen(null))

 function updateWithSelected({ color, id }) {
  setSelectedColor(color)
  updateBgColor({ color, id })
 }

 const handleColorChange = (color) => {
  setIsPickerOpen(null)
  setSelectedColor
   ? updateWithSelected({ color, id })
   : updateBgColor({ color, id })
 }

 return (
  <div
   className="flex items-center justify-between gap-3 px-4 py-2 bg-white shadow-md shadow-black absolute -bottom-10 rounded-xl left-1/2 -translate-x-1/2 "
   ref={ref}
  >
   {colors.map((color) => (
    <div
     key={color.id}
     onClick={() => handleColorChange(color.color)}
     style={{ backgroundColor: color.color }}
     className="w-7 h-7 rounded-full cursor-pointer hover:scale-125 transition-all duration-300"
    />
   ))}
  </div>
 )
}

export default ColorPicker
