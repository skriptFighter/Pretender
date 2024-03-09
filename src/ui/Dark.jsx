import { useState } from "react"
import Button from "../components/Button"
import { FaMoon } from "react-icons/fa"
import { MdSunny } from "react-icons/md"

//todo preserve dark mode on reload
function Dark() {
 const root = document.getElementsByTagName("html")[0]
 const [isDark, setIsDark] = useState(false)

 function dark() {
  root.classList.toggle("dark")
  setIsDark(!isDark)
 }
 return (
  <Button
   onClick={() => dark()}
   round={true}
   className={"absolute bottom-3 left-3"}
  >
   {isDark ? <MdSunny /> : <FaMoon />}
  </Button>
 )
}

export default Dark
