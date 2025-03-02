import { useEffect, useState } from "react"
import { useLoaderData, useNavigate, useLocation } from "react-router-dom"
import {Grid2 as Grid, Card,
   CardHeader, CardContent, CardActions,
   Typography, Button, Dialog, DialogTitle,
   DialogContent, DialogContentText, DialogActions } from '@mui/material'
import {Edit, Delete} from '@mui/icons-material';

function Warehouse({id}) {
  
  const warehouse = useLoaderData()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    if (warehouse===null) {
      navigate('/login', {state: {"from": location.pathname}})
    }
  },[]
  )

  const onDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await fetch(`/api/warehouses/${id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },})
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
          onDelete()
        } else {
          navigate('/login', {state: {"from": location.pathname}})
        }
      }
    navigate('/warehouses')
    } catch (err) {
      console.error(err)
    }
  }

  return (
      <>

        <Dialog
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete warehouse"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete the warehouse? This cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(!open)} autoFocus variant="contained">Cancel</Button>
            <Button onClick={() => onDelete(id)} startIcon={<Delete />} variant="contained" color="warning">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Grid
          container
            sx={{
            justifyContent: "center",
            alignItems: "center",
            height: '100vh',
            margin: 'auto',
          }}>
            <Card
              sx={{
                padding: 1, 
                boxShadow: 3, 
              }}>
                <CardHeader 
                    title="Warehouse"
                    titleTypographyProps={{ align: 'center'}} />
                <CardContent>
                <Typography variant="h6" component="div">
                  {warehouse.warehouse_name}
                </Typography>
                <Typography>
                  {warehouse.warehouse_info}
                </Typography>
                </CardContent>
                <CardActions >
                  <Button
                     variant="contained" 
                     startIcon={<Edit />}
                     onClick={() =>navigate(`/edit-warehouse/${id}`)}>
                      Edit
                    </Button>
                  <Button 
                      variant="contained" 
                      startIcon={<Delete />}
                      color="warning" 
                      onClick={() => setOpen(!open)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
          </Grid>
      </>
    )
}

const warehouseLoader = async ({params}) => {

  try {
    const token = localStorage.getItem('accessToken')
    const res = await fetch(`/api/warehouses/${params.id}`, {
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
        warehouseLoader()
      } else {
        return null
      }
    }
    const data = await res.json()
    return data
  } catch (err) {
    console.log("error:", err)
  }
}

export {Warehouse as default, warehouseLoader}