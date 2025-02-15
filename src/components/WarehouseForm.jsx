import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {Card, CardContent, Grid2 as Grid, Button, TextField, CardHeader, CardActions} from '@mui/material'


function WarehouseForm({legend, id=null, warehouse=null}) {
    const navigate = useNavigate()
    const location = useLocation()
    const [warehouseName, setWarehouseName] = useState(warehouse? warehouse.warehouse_name: "")
    const [warehouseInfo, setWarehouseInfo] = useState(warehouse? warehouse.warehouse_info: "")

    const handleForm = async (e) => {
      e.preventDefault()
      try {
        const token = localStorage.getItem('accessToken')
        let res;
        if (id === null) {
          res = await fetch('/api/warehouses/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({"warehouse_name":warehouseName, "warehouse_info": warehouseInfo})
          })
        } else {
          res = await fetch(`/api/warehouses/${id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({"warehouse_name":warehouseName, "warehouse_info": warehouseInfo})
          })
        }
        if (res.status==401) {
          const token = localStorage.getItem('refreshToken')
          const res = await fetch('/api/token/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"refresh": token})
          })
          if (res.ok) {
            const data = await res.json()
            localStorage.setItem("accessToken", data["access"])
            handleForm()
            
          } else {
            navigate('/login', {state: {"from": location.pathname}})
          }
        }
        navigate(`/warehouses/`)
      } catch (err) {
        console.error(err)
      }
    }

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: '100vh',
        margin: 'auto',
      }}
    >
      <Card
      sx={{
        padding: 1, 
        boxShadow: 3, }}>
        <CardHeader title={legend} titleTypographyProps={{ align: 'center' }}/>
        <form onSubmit={handleForm}>
          <CardContent>
          
            <TextField
                required
                fullWidth
                id="outlined-required"
                label="Warehouse Name"
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
                sx={{
                  mb: 2, // Optional padding
                }}
              />
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              id="outlined-required"
              label="Warehouse Info"
              value={warehouseInfo}
              onChange={(e) => setWarehouseInfo(e.target.value)}
              sx={{
                mb: 2, // Optional padding
              }}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={() =>navigate('/warehouses')}>Cancel</Button>
            <Button variant="contained" type="submit">Submit</Button>
          </CardActions>
        </form>
      </Card>
    </Grid>
  )
}

export default WarehouseForm