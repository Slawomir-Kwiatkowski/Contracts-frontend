import Warehouse from "../components/Warehouse"
import { useNavigate, useParams, Link } from "react-router-dom"

function WarehousePage() {
  const {id} = useParams()

  return (
    <>
        <Warehouse id={id}/>
    </>
  )
}

export default WarehousePage