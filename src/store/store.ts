import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './feature/userSlice';
import messagesSlice from './feature/messagesSlice';

const reducer = combineReducers({ userSlice, messagesSlice });

const store = configureStore({
	reducer,
});

export { store };

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
