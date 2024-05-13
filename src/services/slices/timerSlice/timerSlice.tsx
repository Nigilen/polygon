import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TTimer = {
	seconds: number;
	id: string;
	time: {
		day: number;
		month: number;
		year: number;
	};
	tag: string;
};

type TInitialStateTimer = {
	timer: {
		h: number;
		m: number;
		s: number;
	};
	tag: string;
	pause: boolean;
	process: boolean;
	progressBarValue: number;
	response: TTimer[];
};

export const initialStateTimer: TInitialStateTimer = {
	timer: {
		h: 0,
		m: 0,
		s: 0,
	},
	tag: '',
	pause: true,
	process: false,
	progressBarValue: 0,
	response: [],
};

export const postTimerApi = (data: any) => {
	fetch('https://ovsinka.ru/timers.php', {
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

export const postTimer = createAsyncThunk('timer/post', async (data: any) =>
	postTimerApi(data)
);

export const getAllTimersApi = () =>
	fetch('https://ovsinka.ru/timers.json')
		.then((res) => res.json())
		.then((data) => data.data);

export const getAllTimers = createAsyncThunk('timer/get', getAllTimersApi);

export const timerSlice = createSlice({
	name: 'timer',
	initialState: initialStateTimer,
	selectors: {
		getTimer: (state) => state.timer,
		getPause: (state) => state.pause,
		getProcess: (state) => state.process,
		getBarValue: (state) => state.progressBarValue,
		getTag: (state) => state.tag,
		getResponseTimers: (state) => state.response,
	},
	reducers: {
		updateTimer: (state) => {
			if (state.timer.s > 0) {
				state.progressBarValue =
					state.progressBarValue +
					(1350 - state.progressBarValue) /
						100 /
						((Number(state.timer.s - 0.99) +
							Number(60 * state.timer.m) +
							Number(360 * state.timer.h)) /
							100);
				state.timer.s = state.timer.s - 1;
			}
			if (state.timer.s === 0 && state.timer.m > 0) {
				state.timer.m = state.timer.m - 1;
				state.timer.s = 59;
			}
			if (state.timer.m === 0 && state.timer.h > 0) {
				state.timer.h = state.timer.h - 1;
				state.timer.m = 59;
			}
		},
		setTimer: (state, action) => {
			state.timer.s = action.payload.s;
			state.timer.m = action.payload.m;
			state.timer.h = action.payload.h;
		},
		setPause: (state, action) => {
			state.pause = action.payload;
		},
		setProcess: (state, action) => {
			state.process = action.payload;
		},
		resetProgressBar: (state) => {
			state.progressBarValue = 0;
		},
		setTag: (state, action) => {
			state.tag = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postTimer.pending, (state, action) => {})
			.addCase(postTimer.rejected, (state, action) => {})
			.addCase(postTimer.fulfilled, (state, action) => {
				console.log(action.payload);
			})
			.addCase(getAllTimers.pending, (state, action) => {})
			.addCase(getAllTimers.rejected, (state, action) => {})
			.addCase(getAllTimers.fulfilled, (state, action) => {
				state.response = action.payload;
			});
	},
});

export const {
	getTimer,
	getPause,
	getBarValue,
	getTag,
	getProcess,
	getResponseTimers,
} = timerSlice.selectors;
export const {
	updateTimer,
	setTimer,
	setPause,
	resetProgressBar,
	setTag,
	setProcess,
} = timerSlice.actions;
export default timerSlice.reducer;
