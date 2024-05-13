import { combineReducers, configureStore } from '@reduxjs/toolkit';
import timerSlice from './slices/timerSlice/timerSlice';
import { useDispatch as dispatchHook } from 'react-redux';
import { useSelector as selectorHook } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { timerMiddleware } from './middlewares/timerMiddleware';
import insertTimeSlice from './slices/insertTimeSlice/insertTimeSlice';
import tagsSlice from './slices/tagsSlice/tagsSlice';

export const rootReducer = combineReducers({
	timer: timerSlice,
	insertTime: insertTimeSlice,
	tags: tagsSlice,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(timerMiddleware()),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
