import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputLabel, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { updateUser } from '@/store/userSlice';
import { AppDispatch } from '@/store';
import { UserInputData } from '../../shared-repo/src/userTypes';

interface EditUserModalProps {
    userData: UserInputData;
    open: boolean;
    onClose: () => void;
}

const EditUserModal = ({ userData, open, onClose }: EditUserModalProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState(userData.data.gender);

    useEffect(() => {
        setName(userData.data.name);
        setUsername(userData.data.username);
        setEmail(userData.data.email);
        setCountry(userData.data.country);
        setGender(userData.data.gender);
    }, [userData])

    const handleSave = () => {

        const updatedUser = {
            document_id: userData.document_id,
            data: {
                name,
                username,
                email,
                gender,
                country,
            },
        };

        // console.log(updatedUser)
        dispatch(updateUser(updatedUser));        
        onClose();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as "Male" | "Female" | "Other");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormControl variant="standard" sx={{ my: 1, minWidth: 220 }}>
                    <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={gender}
                        onChange={handleChange}
                        label="Gender"
                    >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    margin="dense"
                    label="Country"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;
