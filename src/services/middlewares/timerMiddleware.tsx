import { Middleware } from 'redux';
import { updateTimer } from '../slices/timerSlice/timerSlice';
import { startTimer, stopTimer } from '../actions/timerActions';

export const timerMiddleware = (): Middleware => (store) => {
	let time: NodeJS.Timeout;
	return (next) => (action) => {
		if (startTimer.match(action)) {
			time = setInterval(() => store.dispatch(updateTimer()), 1000);
		} else if (stopTimer.match(action)) {
			clearInterval(time);
		} else {
			next(action);
		}
	};
};
