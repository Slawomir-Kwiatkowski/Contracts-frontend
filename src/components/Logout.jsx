function Logout() {
    
    const onClick = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }

  return (
    <>
        <button onClick={onClick}>Logout</button>
    </>
  )
}

export default Logout