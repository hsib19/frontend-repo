'use client';

import React, { useState } from 'react';
import { TextField, Button, Grid2, Typography, Alert, Box, CircularProgress } from '@mui/material';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {

    const { login, loginLoading, errorLoginMessage } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <Grid2
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid2 size={{ xs: 12, lg: 3, md: 5, sm: 12, xl: 2.5 }}>
                    <Box sx={{ mt: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: 3 }}>
                        <Box sx={{ mb: 5 }}>
                            <Typography variant='h3'>Login</Typography>
                            <Typography variant='subtitle1'>Please insert your email & password</Typography>
                        </Box>

                        {errorLoginMessage &&
                            <Box sx={{ mb: 2 }}>
                                <Alert severity="error">{errorLoginMessage}</Alert>
                            </Box>

                        }

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                            disabled={loginLoading}
                        >
                            {loginLoading ? <CircularProgress size={20} /> : 'Sign In'}
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </>
    );
};

export default LoginPage;
