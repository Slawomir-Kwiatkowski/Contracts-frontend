import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"


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
    <form onSubmit={handleForm}>
      <legend>{legend}</legend>  
      <div>
        <label>Warehouse name:</label>
        <input
            type="text"
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
            required
          />
      </div>
      <div>
        <label>Warehouse info:</label>
        <input
            type="text"
            value={warehouseInfo}
            onChange={(e) => setWarehouseInfo(e.target.value)}
            required
          />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={() =>navigate('/warehouses')}>Cancel</button>
    </form>
  )
}

export default WarehouseForm