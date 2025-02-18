import Warehouse from "../components/Warehouse"
import {  useParams } from "react-router-dom"

function WarehousePage() {
  const {id} = useParams()

  return (
    <>
        <Warehouse id={id}/>
    </>
  )
}

export default WarehousePage