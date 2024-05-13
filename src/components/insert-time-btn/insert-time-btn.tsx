import { InsertTimeBtnUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
	getProcess,
	setTimer,
} from '../../services/slices/timerSlice/timerSlice';
import {
	TTimer,
	TTimerWithId,
	deleteTimer,
	editTimer,
	getState,
} from '../../services/slices/insertTimeSlice/insertTimeSlice';
import { useLocation } from 'react-router-dom';
import { Dispatch, FC, SetStateAction } from 'react';

type InsertTimeBtnProps = {
	setValues: Dispatch<SetStateAction<{ h: number; m: number; s: number }>>;
};

export const InsertTimeBtn: FC<InsertTimeBtnProps> = ({ setValues }) => {
	const timers = useSelector(getState).timers;
	const process = useSelector(getProcess);
	const dispatch = useDispatch();
	const location = useLocation();

	const handleClick = (timer: TTimer) => {
		setValues(timer);
		dispatch(setTimer(timer));
	};

	const handleDelete = (id: number) => {
		// dispatch(removeTimer(id));
		dispatch(deleteTimer(id));
	};

	const handleEdit = ({ h, m, s, id }: TTimerWithId) => {
		dispatch(editTimer({ h, m, s, id }));
	};

	return (
		<>
			{timers.map((i, index) => (
				<InsertTimeBtnUI
					s={i.s}
					m={i.m}
					h={i.h}
					onClick={() => handleClick(i)}
					key={index}
					disabled={process}
					onDelete={() => handleDelete(index)}
					onEdit={() => handleEdit({ h: i.h, m: i.m, s: i.s, id: index })}
					locationState={{ background: location }}
				/>
			))}
		</>
	);
};
