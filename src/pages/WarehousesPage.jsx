import Warehouses from "../components/Warehouses"
import { useState } from "react";
import { useNavigate} from "react-router-dom"
import AddTaskOutlinedIcon  from '@mui/icons-material/AddTaskOutlined';
import { Button, Tooltip } from '@mui/material';
function WarehousesPage() {
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState("hello")
  return (
    <>
      <Tooltip title="Add Warehouse" arrow>
        <Button 
            variant="contained" 
            startIcon={<AddTaskOutlinedIcon />}
            sx={{mt:2, mb:2}}
            onClick={() => navigate('/add-warehouse')} 
            disabled={disabled}
         />
      </Tooltip>
      {/* {setDisabled((prevDisabled) => (prevDisabled))} */}
      
      <Warehouses disabled={disabled} setDisabled={setDisabled}/>
    </>
  )
}

export default WarehousesPage