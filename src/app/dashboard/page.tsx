'use client';

import React, { useState } from 'react';
import { Typography, Box, Button, Grid2, Divider, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '@/context/AuthContext';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, resetState, selectUsers } from '@/store/userSlice';
import { AppDispatch } from '@/store';
import EditUserModal from '@/components/EditModal';
import { Close } from '@mui/icons-material';
import { UserInputData } from '../../../shared-repo/src/userTypes';

const DashboardPage = () => {

    const { user, logout } = useAuth();

    const dispatch = useDispatch<AppDispatch>();

    const { users, loading, error, message } = useSelector(selectUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserInputData>();

    if (!user) {
        return (<Box sx={{ alignItems: 'center', justifyContent: 'center', display: "flex", flexDirection: 'column', height: "100vh" }}>
                    <Grid2 size={{ lg: 12, sm: 12, md: 12, xs: 12 }}>
                        <CircularProgress size={30} />
                    </Grid2>
                </Box>);
        }

    const openModal = (user: UserInputData) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const onShowData = async () => {
        try {
            dispatch(fetchUsers());
        } catch (error) {
            console.log(error)
            alert("You not have permission")
        } 
    };

    const onLogOut = () => {

        dispatch(resetState())
        logout();
    }

    return (
        <Grid2
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid2 size={{ lg: 8, xl: 8 }} sx={{ py: 5 }}>
                <Box>
                    <Typography variant="h4">Hi, {user.email}</Typography>
                </Box>
                <Box flexDirection={"column"} sx={{ mt: 2, columnGap: 10 }}>
                    <Button variant='contained' onClick={onShowData}>
                        Show Users
                    </Button>
                    <Button sx={{ ml: 3 }} color="error" variant='contained' onClick={onLogOut}>
                        Log Out
                    </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                {message != null &&
                    <Alert sx={{ mb: 3 }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                        {message}
                    </Alert>
                }

                {error != null &&
                    <Alert sx={{ mb: 3 }} icon={<Close fontSize="inherit" />} severity="error">
                        {error}
                    </Alert>
                }

                {loading ? 
                <CircularProgress size={30} />
                :
                (<>
                        {users.length > 0 ? (

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nama</TableCell>
                                            <TableCell >Username</TableCell>
                                            <TableCell >Email</TableCell>
                                            <TableCell >Gender</TableCell>
                                            <TableCell >Country</TableCell>
                                            <TableCell align='center'>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((row) => (
                                            <TableRow
                                                key={row.data.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.data.name}
                                                </TableCell>
                                                <TableCell >{row.data.username}</TableCell>
                                                <TableCell >{row.data.email}</TableCell>
                                                <TableCell >{row.data.gender}</TableCell>
                                                <TableCell >{row.data.country}</TableCell>
                                                <TableCell align='center'>
                                                    <Button variant='contained' onClick={() => openModal(row)}>Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        ) : (
                            <p>No users found.</p>
                        )}
                </>)
                }


               

                {selectedUser && (
                    <EditUserModal
                        userData={selectedUser}
                        open={isModalOpen}
                        onClose={closeModal}
                    />
                )}

            </Grid2>
        </Grid2>
    );
};

export default DashboardPage;
