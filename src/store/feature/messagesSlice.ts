import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import IRecado from '../../models/interfaces/recadoInterface';
import apiService from '../../services/api/api';

export const getMessages = createAsyncThunk(
	'message/get',
	async (user_id: string, { dispatch, getState }) => {
		const response = await apiService.doGet(`/recados/true/${user_id}`);
		return response;
	}
);
export const postMessage = createAsyncThunk(
	'message/post',
	async (
		{ data, user_id }: { data: object; user_id: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPost(`/recados/${user_id}`, data);
		dispatch(getMessages(user_id));
		return response;
	}
);

const initialState: {
	all_messages_true: Array<IRecado>;
	all_messages_false: Array<IRecado>;
	message: string;
} = {
	all_messages_true: [],
	all_messages_false: [],
	message: '',
};

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(
			getMessages.fulfilled,
			(state, action: PayloadAction<{ data: Array<IRecado> }>) => {
				state.all_messages_true = action.payload.data;
			}
		);
	},
});

export const { setMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
