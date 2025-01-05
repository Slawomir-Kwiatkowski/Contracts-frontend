import Warehouse from "../components/Warehouse"
import { useNavigate, useParams, Link } from "react-router-dom"

function WarehousePage() {
  const navigate = useNavigate()
  const {id} = useParams()

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
      <Link to={"/warehouses"}>&lt;- Back to Warehouses</Link>
      <div>
        <button onClick={() =>navigate(`/edit-warehouse/${id}`)}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button></div>
        <Warehouse />
    </>
  )
}

export default WarehousePage