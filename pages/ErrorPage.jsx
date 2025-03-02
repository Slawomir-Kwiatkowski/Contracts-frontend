import { Box, Typography } from '@mui/material';
function ErrorPage() {
  return (
    <Box 
      justifyContent="center"
      alignItems="center"
      textAlign={'center'}
    >
      <Typography variant="h1" fontWeight="bold" color="warning" >404</Typography>
      <Typography variant="h5" color="warning">Page not found</Typography>
    </Box>
  )
}

export default ErrorPage