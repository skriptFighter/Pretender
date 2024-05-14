import { useUpdateBgColor } from "../hooks/useUpdateBgColor"
import { useClickOutside } from "../hooks/useClickOutside"
import { useSelector } from "react-redux"
import { selectDark } from "../notesSlice"

const colors = [
 { id: 1, light: "#ffd8d9", dark: "#cbadae" },
 { id: 2, light: "#fff0f5", dark: "#c9b6bb" },
 { id: 3, light: "#EDE0E7", dark: "#baabb2" },
 { id: 4, light: "#c2e0f0", dark: "#9cb4c0" },
 { id: 5, light: "#dce7f7", dark: "#bbc5d2" },
 { id: 6, light: "#dcedc8", dark: "#97a28b" },
 { id: 7, light: "#d9f7be", dark: "#a8ba93" },
 { id: 8, light: "#D9E1C1", dark: "#aab195" },
 { id: 9, light: "#ece1d4 ", dark: "#b5a999" },
 { id: 10, light: "#F8F4F1 ", dark: "#a4a29d" },
]

function ColorPicker({ id, setIsPickerOpen, setSelectedColor }) {
 //  setSelectedColor is for edit note bgColor

 const isDark = useSelector(selectDark)

 const { updateBgColor } = useUpdateBgColor()
 const ref = useClickOutside(() => setIsPickerOpen(null))

 function updateWithSelected({ color: { light, dark }, id }) {
  setSelectedColor({ light, dark })
  updateBgColor({ light, dark, id })
 }

 function handleColorChange({ color }) {
  setIsPickerOpen(null)
  setSelectedColor
   ? updateWithSelected({ color, id })
   : updateBgColor({ color, id })
 }

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
