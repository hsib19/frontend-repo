import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './index';
import { UserInputData } from '../../shared-repo/src/userTypes';

import axiosInstance from '@/apis/axiosInstance';
import axios from 'axios';

interface UserState {
    users: UserInputData[];
    loading: boolean;
    error: string | null;
    message: string | null;
}

// Initial state
const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    message: null,
};

// Asynchronous thunk to simulate fetching users
export const fetchUsers = createAsyncThunk<UserInputData[], void, { rejectValue: string }>(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("fetch-user-data");
            const users = await response.data.data;
            return users;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data)
            } else {
                return rejectWithValue('Failed to fetch user');
            }
        }
    }
);

export const updateUser = createAsyncThunk<UserInputData, UserInputData, { rejectValue: string }>(
    'users/updateUser',
    async (updatedUser, { rejectWithValue }) => {
        try {
            // console.log("updatedUser", updatedUser)
            await axiosInstance.put("update-user-data", updatedUser);
            return updatedUser;
        } catch (error) {

            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.errors[0])
            } else {
                return rejectWithValue('Failed to update user');
            }
  
        }
    }
);

export const resetState = createAsyncThunk<void, void, { rejectValue: string }>(
    'users/reset_state',
    async (_, { dispatch }) => {
        dispatch(userSlice.actions.resetState());
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load users';
            }).addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const index = state.users.findIndex(user => user.document_id === updatedUser.document_id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
                state.loading = false;
                state.message = "User data successfully changed";
            }).addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.message = null;
                state.error = action.payload || 'Failed to load users';
            });
    },
});

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;
