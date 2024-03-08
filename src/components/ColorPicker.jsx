import { CirclePicker } from "react-color"
import { useForm } from "react-hook-form"
import { useUpdateBgColor } from "../hooks/useUpdateBgColor"

function ColorPicker({ setIsPickOpen, id }) {
 const { register, handleSubmit, watch, setValue } = useForm()
 const { updateBgColor } = useUpdateBgColor()
 const selectedColor = watch("color")

 const handleColorChange = (color) => {
  setValue("color", color.hex)
 }

 const onSubmit = (data) => {
  setIsPickOpen((isOpen) => !isOpen)
  updateBgColor({ ...data, id })
 }

 return (
  <div className="w-64 h-10 bg-white shadow-md shadow-black absolute -bottom-10 rounded-xl left-1/2 -translate-x-1/2 flex items-center gap-3 p-2">
   <form>
    <CirclePicker
     onChange={handleColorChange}
     color={selectedColor}
     onChangeComplete={handleSubmit(onSubmit)}
     colors={["#ff0000", "#0000ff", "#00ff00", "#ffff00", "#800080", "#ffa500"]}
    />
    <input type="hidden" {...register("color")} />
   </form>
  </div>
 )
}

export default ColorPicker
