import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type TTimer = {
	h: number;
	m: number;
	s: number;
};

export type TTimerWithId = {
	id: number;
} & TTimer;

type TInitialState = {
	edited: TTimerWithId;
	timers: TTimer[];
};

const initialState: TInitialState = {
	edited: {
		h: 0,
		m: 0,
		s: 0,
		id: 0,
	},
	timers: [],
};

export const postTimersListApi = (data: any) => {
	fetch('https://ovsinka.ru/add-timer-to-list.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(data),
	}).then((response) => {
		if (response) return response;
		return Promise.reject(response);
	});
};

export const postTimersList = createAsyncThunk(
	'insertTime/post',
	async (data: any) => postTimersListApi(data)
);

export const deleteTimerApi = (data: any) => {
	fetch('https://ovsinka.ru/timers-list.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(data),
	}).then((response) => {
		if (response) return response;
		return Promise.reject(response);
	});
};

export const deleteTimer = createAsyncThunk(
	'insertTime/del',
	async (data: number) => deleteTimerApi(data)
);
export const editTimerApi = (data: any) => {
	fetch('https://ovsinka.ru/edit-timers-list.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(data),
	}).then((response) => {
		if (response) return response;
		return Promise.reject(response);
	});
};

export const editTimers = createAsyncThunk(
	'insertTime/edit',
	async (data: any) => editTimerApi(data)
);

export const getTimersListApi = () =>
	fetch('https://ovsinka.ru/timers-list.json')
		.then((res) => res.json())
		.then((data) => data.data);

export const getTimersList = createAsyncThunk(
	'insertTime/get',
	getTimersListApi
);

export const insertTimeSlice = createSlice({
	name: 'insertTime',
	initialState,
	reducers: {
		addTimer: (state, action) => {
			state.timers = [...state.timers, action.payload];
		},
		removeTimer: (state, action) => {
			state.timers = state.timers.filter(
				(i, index) => index !== action.payload
			);
		},
		editTimer: (state, action) => {
			state.edited.h = action.payload.h;
			state.edited.m = action.payload.m;
			state.edited.s = action.payload.s;
			state.edited.id = action.payload.id;
		},
		setEditTimer: (state, action) => {
			state.timers.splice(state.edited.id, 1, action.payload);
		},
	},
	selectors: {
		getState: (state) => state,
		getEditTimer: (state) => state.edited,
	},
	extraReducers: (builder) => {
		builder
			.addCase(postTimersList.pending, (state, action) => {})
			.addCase(postTimersList.rejected, (state, action) => {})
			.addCase(postTimersList.fulfilled, (state, action) => {
				console.log(action.payload);
			})
			.addCase(deleteTimer.pending, (state, action) => {})
			.addCase(deleteTimer.rejected, (state, action) => {})
			.addCase(deleteTimer.fulfilled, (state, action) => {
				console.log(action.payload);
			})
			.addCase(editTimers.pending, (state, action) => {})
			.addCase(editTimers.rejected, (state, action) => {})
			.addCase(editTimers.fulfilled, (state, action) => {
				console.log(action.payload);
			})
			.addCase(getTimersList.pending, (state, action) => {})
			.addCase(getTimersList.rejected, (state, action) => {})
			.addCase(getTimersList.fulfilled, (state, action) => {
				state.timers = action.payload;
			});
	},
});

export const { getState, getEditTimer } = insertTimeSlice.selectors;
export const { addTimer, removeTimer, setEditTimer, editTimer } =
	insertTimeSlice.actions;
export default insertTimeSlice.reducer;
