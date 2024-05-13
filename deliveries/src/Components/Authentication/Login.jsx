import * as React from 'react';
import { TextField, Typography, Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import axios from "axios"


// Styled Box component with border and shadow
const StyledBox = styled(Box)({
    border: '1px solid #e0e0e0',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '8px',
});

export default function Login() {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const companyData = {           
            email: formData.get('companyEmail'),
            password: formData.get('password'),
        };
      const response =  await axios.post("http://localhost:4000/auth/login",companyData );
      const token = response.data.token;
      localStorage.setItem('token', token);  
      toast.success("Login successfull")
      navigate('/')      
    };

    return (
        <Grid container justifyContent="center" sx={{ marginTop: '1rem' }}>
            <Grid item xs={12} sm={10} md={6}>

                <StyledBox
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant='h4' sx={{ fontSize: '24px', fontWeight: 'bold',textAlign:"center" }}>Sign in</Typography>
                    <div>                        
                        <TextField
                            required
                            id="companyEmail"
                            name="companyEmail"
                            type="email"
                            label="Company Email"
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                    <Link to="/register" className='text-sm  ml-3 underline ' style={{color:"blue"}}>create account</Link>
                </StyledBox>
            </Grid>
        </Grid>
    );
}
