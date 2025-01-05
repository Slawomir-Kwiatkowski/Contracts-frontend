import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function Warehouses() {
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
  }, []);

  return (
    <>
      {/* {warehouses.length>0 ? 
        warehouses.map((warehouse) => (
          <ul key={warehouse.id}>
            <li>{warehouse.warehouse_name}</li>
          </ul>
          )) : 
          <h1>Loading...</h1>} */}
      {warehouses.length>0 ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Workspace Name</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse, index) =>
                <tr onClick={() => (navigate(`/warehouses/${warehouse.id}`))} key={index}>
                  <td>
                    {++index}
                  </td>
                  <td>
                    {warehouse.warehouse_name}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) :
        <h1>Loading...</h1>
      }
    </>
  )
}

export default Warehouses