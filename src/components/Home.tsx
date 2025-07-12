import { useState } from "react"
import Leftbar from "./Leftbar"
import Rightbar from "./Rightbar"

type seachProp = {
  search:any
}

const Home = (props:seachProp) => {

  const [menu,setMenu] = useState("")

  return (
    <div className="w-screen bg-gray-100 flex ">
       
        <div className="flex justify-center items-center w-full ">
        <Rightbar search={props?.search} menu={menu}/>
        </div>
    </div>
  )
}

export default Home
