import WarehouseForm from "../components/WarehouseForm"
import { useParams, useLoaderData } from "react-router-dom"

function WarehouseEditPage() {
  const {id} = useParams() 
  const warehouse = useLoaderData()
  return (
    <>
        <WarehouseForm legend="Edit Warehouse" id={id} warehouse={warehouse}/>
    </>
  )
}

export default WarehouseEditPage