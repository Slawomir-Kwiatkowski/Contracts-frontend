import Warehouses from "../components/Warehouses"
import { useEffect } from "react";
import { useLoaderData, useNavigate, useLocation,} from "react-router-dom"
import AddTaskOutlinedIcon  from '@mui/icons-material/AddTaskOutlined';
import { Button, Tooltip } from '@mui/material';
function WarehousesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const warehouses = useLoaderData()

  useEffect(() => {
      if (!warehouses) {
        navigate('/login', {state: {"from": location.pathname}})
      }
  }, [])

  if (warehouses){
    return (
      <>
          <Tooltip title="Add Warehouse" arrow>
            <Button 
                variant="contained" 
                startIcon={<AddTaskOutlinedIcon />}
                sx={{mt:2, mb:2}}
                onClick={() => navigate('/add-warehouse')} 
                disabled={warehouses?.detail ? true : false}
            />
          </Tooltip>
          <Warehouses warehouses={warehouses} />
      </>
    )
  }
}

export default WarehousesPage