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

export const deleteMessage = createAsyncThunk(
	'message/delete',
	async (
		{ message_id, user_id }: { message_id: string; user_id: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doDelete(`/recados/${message_id}`);
		dispatch(getMessages(user_id));
		dispatch(getMessagesFalse(user_id));

		return response;
	}
);

export const putMessage = createAsyncThunk(
	'message/put',
	async (
		{
			message_id,
			data,
			user_id,
		}: { message_id: string; data: object; user_id: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPut(`/recados/${message_id}`, data);
		dispatch(getMessages(user_id));
		return response;
	}
);

export const putArquived = createAsyncThunk(
	'message/arquived',
	async (
		{ message_id, user_id }: { message_id: string; user_id: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPut(`/recados/arquivar/${message_id}`);
		dispatch(getMessages(user_id));
		dispatch(getMessagesFalse(user_id));
		return response;
	}
);

export const getSearch = createAsyncThunk(
	'message/search',
	async (
		{ user_id, data }: { user_id: string; data: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doGet(
			`/recados/filter/true/${user_id}/?title=${data}`
		);
		return response;
	}
);

export const getMessagesFalse = createAsyncThunk(
	'messageFalse/get',
	async (user_id: string, { dispatch, getState }) => {
		const response = await apiService.doGet(`/recados/false/${user_id}`);
		return response;
	}
);

export const putUnarchive = createAsyncThunk(
	'message/Unarchive',
	async (
		{ message_id, user_id }: { message_id: string; user_id: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPut(
			`/recados/desarquivar/${message_id}`
		);
		dispatch(getMessages(user_id));
		dispatch(getMessagesFalse(user_id));
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
		addCase(
			putMessage.fulfilled,
			(state, action: PayloadAction<{ data: Array<IRecado> }>) => {
				state.all_messages_true = action.payload.data;
			}
		);
		addCase(
			getSearch.fulfilled,
			(state, action: PayloadAction<{ data: Array<IRecado> }>) => {
				state.all_messages_true = action.payload.data;
			}
		);
		addCase(
			getMessagesFalse.fulfilled,
			(state, action: PayloadAction<{ data: Array<IRecado> }>) => {
				state.all_messages_false = action.payload.data;
				console.log('----------------', state.all_messages_false);
			}
		);
	},
});

export const { setMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
