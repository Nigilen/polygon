import { TimerUI } from '@ui';
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect } from 'react';
import {
	getBarValue,
	getPause,
	getProcess,
	getTag,
	getTimer,
	postTimer,
	resetProgressBar,
	setPause,
	setProcess,
	setTimer,
} from '../../services/slices/timerSlice/timerSlice';
import { useDispatch, useSelector } from '../../services/store';
import { startTimer, stopTimer } from '../../services/actions/timerActions';
import useSound from 'use-sound';
import sound from '../../assets/sound.mp3';
import { nanoid } from '@reduxjs/toolkit';
import playSVG from '../../assets/svg/play-btn.svg';
import pauseSVG from '../../assets/svg/pause-btn.svg';

type TimerProps = {
	values: { s: number; m: number; h: number };
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	setValues: Dispatch<SetStateAction<{ h: number; m: number; s: number }>>;
};

export const Timer: FC<TimerProps> = ({ values, handleChange, setValues }) => {
	const defaultState = { h: 0, m: 0, s: 0 };
	// const [isProcess, toggleProcess] = useState(false);
	const process = useSelector(getProcess);

	const timer = useSelector(getTimer);
	const paused = useSelector(getPause);
	const barValue = useSelector(getBarValue);
	const tag = useSelector(getTag);
	const [playSound] = useSound(sound);

	const dispatch = useDispatch();
	const _ = require('lodash');
	const currentDate = new Date();
	const seconds =
		values.h * 360 +
		values.m * 60 +
		values.s -
		(timer.h * 360 + timer.m * 60 + timer.s);

	useEffect(() => {
		dispatch(setTimer(values));
	}, [values]);

	const handleStart = () => {
		dispatch(setProcess(true));
		if (paused) {
			dispatch(startTimer());
			dispatch(setPause(false));
		} else {
			dispatch(stopTimer());
			dispatch(setPause(true));
		}
	};

	const handleReset = () => {
		setValues(defaultState);
		dispatch(stopTimer());
		dispatch(setPause(true));
		dispatch(resetProgressBar());
		dispatch(setProcess(false));
	};

	const handleSend = () => {
		dispatch(
			postTimer({
				seconds,
				id: nanoid(),
				time: {
					day: currentDate.getDate(),
					month: currentDate.getMonth(),
					year: currentDate.getFullYear(),
				},
				tag: tag,
			})
		);
		handleReset();
	};

	if (timer.h === 0 && timer.m === 0 && timer.s === 0 && !paused) {
		playSound();
		setTimeout(() => {
			dispatch(setProcess(false));
		}, 0.5);

		setTimeout(
			() =>
				dispatch(
					postTimer({
						seconds,
						id: nanoid(),
						time: {
							day: currentDate.getDate(),
							month: currentDate.getMonth(),
							year: currentDate.getFullYear(),
						},
						tag: tag,
					})
				),
			1
		);
		setTimeout(() => handleReset(), 2);
	}

	return (
		<TimerUI
			values={values}
			timer={timer}
			handleChange={handleChange}
			handleReset={handleReset}
			handleStart={handleStart}
			handleSend={handleSend}
			captionBtn={paused ? <img src={playSVG} /> : <img src={pauseSVG} />}
			disabledInput={process}
			isSetTime={_.isEqual(values, defaultState)}
			barValue={barValue}
		/>
	);
};
