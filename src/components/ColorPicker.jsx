import { CirclePicker } from "react-color"
import { useForm } from "react-hook-form"
import { useUpdateBgColor } from "../hooks/useUpdateBgColor"
import { useClickOutside } from "../hooks/useClickOutside"

function ColorPicker({ setIsPickOpen, id }) {
 const { register, handleSubmit, watch, setValue } = useForm()
 const { updateBgColor } = useUpdateBgColor()
 const selectedColor = watch("color")

 const ref = useClickOutside(() => setIsPickOpen(null))

 const handleColorChange = (color) => {
  setValue("color", color.hex)
 }

 const onSubmit = (data) => {
  setIsPickOpen(null)
  updateBgColor({ ...data, id })
 }

 return (
  <div
   className="flex items-center w-80 h-10 bg-white shadow-md shadow-black absolute -bottom-10 rounded-xl left-1/2 -translate-x-1/2 "
   ref={ref}
  >
   <form>
    <CirclePicker
     onChange={handleColorChange}
     color={selectedColor}
     onChangeComplete={handleSubmit(onSubmit)}
     colors={colorsList}
     styles={pickerStyles}
    />
    <input type="hidden" {...register("color")} />
   </form>
  </div>
 )
}

export default ColorPicker

const pickerStyles = {
 default: {
  card: {
   width: "100%",
   "margin-right": "0",
   "margin-left": "22px",
  },
 },
}

const colorsList = [
 "#f44336",
 "#0693e3",
 "#00d084",
 "#ffeb3b",
 "#b279d2",
 "#ff6900",
 "#e91e63",
]
