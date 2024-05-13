import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
	getAllTimers,
	getResponseTimers,
} from '../../services/slices/timerSlice/timerSlice';
import styles from './statistics.module.css';

export const Statistics = () => {
	const allTimers = useSelector(getResponseTimers);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllTimers());
	}, []);

	let weekDays = [];
	for (let j = 0; j < 7; j++) {
		let currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - j);
		weekDays.push(currentDate.toLocaleString('EN', { weekday: 'narrow' }));
	}
	weekDays.reverse();

	let timeOfDay = [];
	for (let j = 0; j < 7; j++) {
		let d = new Date();
		d.setDate(d.getDate() - j);
		timeOfDay.push(
			allTimers
				.filter((i) => i.time.day === d.getDate())
				.map((i) => {
					if (i.time.day === d.getDate()) return i.seconds;
					return 0;
				})
				.reduce((a, b) => a + b, 0)
		);
	}

	return (
		<div className={styles.stat}>
			<div className={styles.axisY}>
				<div>16</div>
				<div>15</div>
				<div>14</div>
				<div>13</div>
				<div>12</div>
				<div>11</div>
				<div>10</div>
				<div>09</div>
				<div>08</div>
				<div>07</div>
				<div>06</div>
				<div>05</div>
				<div>04</div>
				<div>03</div>
				<div>02</div>
				<div>01</div>
				<div>00</div>
			</div>
			<div className={styles.columnsWrapper}>
				{timeOfDay.reverse().map((i, index) => {
					let currentDate = new Date();
					currentDate.setDate(currentDate.getDate() - index);
					return (
						<div className={styles.columnWrapper} key={index}>
							<div className={styles.columnCaption}>
								{(i / 60 / 60).toFixed(1)}
							</div>
							<div
								className={styles.column}
								style={{ height: (i / 60 / 60) * 28.4375 }}
							/>
							<div className={styles.axisXCaptions}>{weekDays[index]}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
