import { Paper, Typography } from "@mui/material"

function Hero() {
  return (
    <Paper
     sx= {{py: 5,
           margin: 1,
           backgroundColor: "#86b25f",
           paddingLeft: 2}}>
      
      <Typography variant="h2" sx={{color: 'white', fontWeight: "bold", py: 2}}>Order Management System</Typography>
      <Typography variant="h6" sx={{color: '#124116'}}>Easy orders management and time slots handling</Typography>
    </Paper>
  )
}

export default Hero