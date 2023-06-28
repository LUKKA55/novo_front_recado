import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import IRecado from '../../interfaces/recadoInterface';
import apiService from '../../services/api/api';

export const getMessages = createAsyncThunk(
	'message/get',
	async (token: string, { dispatch, getState }) => {
		const response = await apiService.doGet(`/recados/true`, {
			headers: { authorization: token },
		});

		return response;
	}
);

export const postMessage = createAsyncThunk(
	'message/post',
	async (
		{ data, token }: { data: object; token: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPost(`/recados`, data, {
			headers: { authorization: token },
		});
		dispatch(getMessages(token));
		return response;
	}
);

export const deleteMessage = createAsyncThunk(
	'message/delete',
	async (
		{ message_id, token }: { message_id: string; token: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doDelete(`/recados/${message_id}`, {
			headers: { authorization: token },
		});
		dispatch(getMessages(token));
		dispatch(getMessagesFalse(token));

		return response;
	}
);

export const putMessage = createAsyncThunk(
	'message/put',
	async (
		{
			message_id,
			data,
			token,
		}: { message_id: string; data: object; token: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPut(`/recados/${message_id}`, data, {
			headers: { authorization: token },
		});
		dispatch(getMessages(token));
		return response;
	}
);

export const putArquived = createAsyncThunk(
	'message/arquived',
	async (
		{ message_id, token }: { message_id: string; token: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPut(
			`/recados/arquivar/${message_id}`,
			undefined,
			{
				headers: { authorization: token },
			}
		);
		dispatch(getMessages(token));
		dispatch(getMessagesFalse(token));
		return response;
	}
);

export const getSearch = createAsyncThunk(
	'message/search',
	async (
		{ token, data }: { token: string; data: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doGet(
			`/recados/filter/true/?title=${data}`,
			{
				headers: { authorization: token },
			}
		);
		return response;
	}
);

export const getMessagesFalse = createAsyncThunk(
	'messageFalse/get',
	async (token: string, { dispatch, getState }) => {
		const response = await apiService.doGet(`/recados/false`, {
			headers: { authorization: token },
		});

		return response;
	}
);

export const putUnarchive = createAsyncThunk(
	'message/Unarchive',
	async (
		{ message_id, token }: { message_id: string; token: string },
		{ dispatch, getState }
	) => {
		const response = await apiService.doPut(
			`/recados/desarquivar/${message_id}`,
			undefined,
			{
				headers: { authorization: token },
			}
		);
		dispatch(getMessages(token));
		dispatch(getMessagesFalse(token));
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
			(
				state,
				action: PayloadAction<{ data: Array<IRecado>; message: string }>
			) => {
				state.message = action.payload.message;
				state.all_messages_true = action.payload.data;
			}
		);
		addCase(
			putMessage.fulfilled,
			(
				state,
				action: PayloadAction<{ data: Array<IRecado>; message: string }>
			) => {
				state.message = action.payload.message;

				state.all_messages_true = action.payload.data;
			}
		);
		addCase(
			getSearch.fulfilled,
			(
				state,
				action: PayloadAction<{ data: Array<IRecado>; message: string }>
			) => {
				state.message = action.payload.message;

				state.all_messages_true = action.payload.data;
			}
		);
		addCase(
			getMessagesFalse.fulfilled,
			(
				state,
				action: PayloadAction<{ data: Array<IRecado>; message: string }>
			) => {
				state.message = action.payload.message;

				state.all_messages_false = action.payload.data;
			}
		);
	},
});

export const { setMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
