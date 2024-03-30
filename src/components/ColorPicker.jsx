import { useUpdateBgColor } from "../hooks/useUpdateBgColor"
import { useClickOutside } from "../hooks/useClickOutside"

const colors = [
 { id: 1, color: "#ffd8d9", name: "Light Pastel Pink" }, // Pastel Pink
 { id: 2, color: "#fff0f5", name: "Very Light Pastel Pink" }, // Very Light Pastel Pink
 { id: 3, color: "#EDE0E7", name: "Very Light Pastel Pink" }, // Very Light Pastel Pink
 { id: 4, color: "#c2e0f0", name: "Light Pastel Blue" }, // Light Pastel Blue
 { id: 5, color: "#dce7f7", name: "Light Pastel Cornflower Blue" }, // Light Pastel Cornflower Blue
 { id: 6, color: "#dcedc8", name: "Light Pastel Green" }, // Light Pastel Green
 { id: 7, color: "#d9f7be", name: "Light Pastel Mint Green" }, // Light Pastel Mint Green
 { id: 8, color: "#D9E1C1", name: "Light Pastel Mint Green" }, // Light Pastel Mint Green
 { id: 9, color: "#F2EAE0 ", name: "Light Pastel Mint Green" }, // Light Pastel Mint Green
 { id: 10, color: "#F8F4F1 ", name: "Light Pastel Mint Green" }, // Light Pastel Mint Green
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
   className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center justify-between gap-3 rounded-xl bg-white px-4 py-2 shadow-md shadow-black "
   ref={ref}
  >
   {colors.map((color) => (
    <div
     key={color.id}
     onClick={() => handleColorChange(color.color)}
     style={{ backgroundColor: color.color }}
     className="h-7 w-7 cursor-pointer rounded-full transition-all duration-300 hover:scale-125"
    />
   ))}
  </div>
 )
}

export default ColorPicker
