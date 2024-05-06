import React from 'react'
import { Card, CardActions, Box, CardContent, Typography } from '@mui/material'
const DeliveriesDashboard = () => {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const card =(title,count) => (
    <React.Fragment>
      <CardContent sx={{textAlign:"center"}}>
        <Typography variant='h1'  sx={{ fontSize: 20,fontWeight:500,color:"#fff" }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant='h1'  sx={{ fontSize: 20,fontWeight:500,color:"#fff" }} color="text.secondary" gutterBottom>
          {count}
        </Typography>

      </CardContent>
    </React.Fragment>
  );
  return (

    <div>
      <Typography variant='h2' sx={{fontSize:24,fontWeight:"bold", textAlign:'center',padding:5}}>G4S Deliveries </Typography>
      <Box className="shadow-md  block p-3  md:flex  ">
        <Card>
          <div className='bg-slate-500 m-2 rounded-lg '>
            {/* Card content */}
            {card("Total Deliveries", 20)}
          </div>
        </Card>
        <Card>
          <div className='bg-blue-500 m-2  rounded-lg'>
            {/* Card content */}
            {card("Pending", 10)}
          </div>
        </Card>
        <Card>
          <div className='bg-emerald-500 m-2  rounded-lg'>
            {/* Card content */}
            {card("Delivered", 5)}
          </div>
        </Card>
      </Box>
    </div>
  )
}

export default DeliveriesDashboard