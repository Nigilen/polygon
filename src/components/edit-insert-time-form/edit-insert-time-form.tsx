import { EditInsertTimeFormUI } from '@ui';
import { useForm } from '../../services/hooks/useForm';
import { FormEvent } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
	setEditTimer,
	getEditTimer,
	editTimers,
} from '../../services/slices/insertTimeSlice/insertTimeSlice';
// import { addTimer } from '../../services/slices/insertTimeSlice/insertTimeSlice';

export const EditInsertTimeForm = () => {
	const edits = useSelector(getEditTimer);
	const dispatch = useDispatch();
	const { values, handleChange } = useForm({
		h: edits.h,
		m: edits.m,
		s: edits.s,
	});

	const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			editTimers({ h: values.h, m: values.m, s: values.s, id: edits.id })
		);
		history.back();
	};

	return (
		<EditInsertTimeFormUI
			values={values}
			handleChange={handleChange}
			handleSumbit={handleSumbit}
		/>
	);
};
