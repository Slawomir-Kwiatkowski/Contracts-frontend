import Warehouses from "../components/Warehouses"
import { useNavigate} from "react-router-dom"
function WarehousesPage() {
  const navigate = useNavigate()
  return (
    <>
      
      <button onClick={() =>navigate(`/add-warehouse/`)}>Add warehouse</button>
        <Warehouses />
    </>
  )
}

export default WarehousesPage