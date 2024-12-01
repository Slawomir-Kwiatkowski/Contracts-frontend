import { useEffect } from "react"
import { useLoaderData, useNavigate, useLocation } from "react-router-dom"

function Warehouse() {
  
  const warehouse = useLoaderData()
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    if (warehouse===null) {
      navigate('/login', {state: {"from": location.pathname}})
    }
  },[]
  )

  return (
      <>
        {warehouse && 
          <><h1>{warehouse.warehouse_name}</h1>
            <h3>{warehouse.warehouse_info}</h3></>}
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