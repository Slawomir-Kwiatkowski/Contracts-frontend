import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import {Paper, Typography} from '@mui/material';

function Warehouses(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [warehouses, setWarehouses] = useState([])
  
  const fetchWarehouses = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await fetch('/api/warehouses/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
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
          fetchWarehouses()
        } else {
          navigate('/login', {state: {"from": location.pathname}})
        }
      }
      const data = await res.json()
      setWarehouses(data)
    } catch (err) {
      console.log("error:", err)
    }
  }

  useEffect(() => {
    fetchWarehouses()
  }, [props.disabled]);
  
  const paginationModel = { page: 0, pageSize: 5 };

  const columns = [
    { field: 'index', headerName: '#', width: 50 },
    { field: 'warehouseName', headerName: 'Warehouse', width: 150 },
    { field: 'warehouseInfo', headerName: 'Info', width: 250 },
  ];
  

  let rows
  if (warehouses === null) {
    return (<h1>Loading...</h1>)
  } else if (warehouses.detail) {
    return(
      <Typography variant="h6" color="error">{warehouses.detail}</Typography>)
  } else {
      rows = warehouses.map((item, index) => ({
      id: item.id,
      index: ++index,
      warehouseName: item.warehouse_name,
      warehouseInfo: item.warehouse_info }))
      props.setDisabled((prevdisabled) => console.log(prevdisabled))
  }
  

  return (
    <>
      
      <Paper sx={{ height: '100%', width: '100%' }}>
        {warehouses &&
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          onRowClick={(params) => (navigate(`/warehouses/${params.row.id}`))}
        /> }
      </Paper>
    </>
  )
}

export default Warehouses