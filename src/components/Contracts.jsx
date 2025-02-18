import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function Contracts() {
  const navigate = useNavigate()
  const location = useLocation()
  const [contracts, setContracts] = useState([])
  
  const fetchContracts = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await fetch('/api/contracts/', {
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
          fetchContracts()
          console.log(contracts)
        } else {
          navigate('/login', {state: {"from": location.pathname}})
        }
      }
      const data = await res.json()
      setContracts(data)
    } catch (err) {
      console.log("error:", err)
    }
  }

  useEffect(() => {
    fetchContracts()
  }, []);

  return (
    <>
      {contracts.length>0 ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Contract</th>
                <th>Status</th>
                <th>Client</th>
                <th>Contractor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Warehouse</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) =>
                <tr onClick={() => (navigate(`/contracts/${contract.id}`))} key={index}>
                  <td>
                    {++index}
                  </td>
                  <td>
                    {contract.contract_number}
                  </td>
                  <td>
                    {contract.status}
                  </td>
                  <td>
                    {contract.client}
                  </td>
                  <td>
                    {contract.contractor}
                  </td>
                  <td>
                    {contract.date_of_delivery}
                  </td>
                  <td>
                    {contract.time_of_delivery}
                  </td>
                  <td>
                    {contract.warehouse}
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

export default Contracts