import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiService from '../../services/api/api';
import IUser from '../../models/interfaces/userInterface';

export const postUser = createAsyncThunk(
	'user/post',
	async (data: object, { dispatch, getState }) => {
		const response = await apiService.doPost('/users/', data);
		return response;
	}
);

export const loginUser = createAsyncThunk(
	'user/login',
	async (data: object, { dispatch, getState }) => {
		const response = await apiService.doPost('/users/login', data);
		if (response.message === 'Login feito com SUCESSO.') {
			dispatch(setUserOnline(true));
		}
		return response;
	}
);

const initialState: {
	user_id: string;
	userOnline: boolean;
	message: string;
} = {
	user_id: '',
	userOnline: false,
	message: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserOnline: (state, action: PayloadAction<boolean>) => {
			state.userOnline = action.payload;
		},
		setMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(
			postUser.fulfilled,
			(state, action: PayloadAction<{ message: string }>) => {
				state.message = action.payload.message;
				console.log('mensagem', state.message);
			}
		);
		addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<{ data: IUser; message: string }>) => {
				state.message = action.payload.message;
				console.log('mensagem', state.message);
				state.user_id = action.payload.data?.id;
			}
		);
	},
});

export const { setUserOnline, setMessage } = userSlice.actions;
export default userSlice.reducer;