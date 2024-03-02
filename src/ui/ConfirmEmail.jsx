import { Link } from "react-router-dom"
import Button from "../components/Button"

function ConfirmEmail() {
 //todo open different website for every email or email app
 return (
  <div className="flex flex-col gap-4">
   <h1 className="text-4xl">Please confirm your email</h1>
   <Link to={"https://www.gmail.com"} target="_blank">
    <Button primary={true}>Confirm</Button>
   </Link>
  </div>
 )
}

export default ConfirmEmail
