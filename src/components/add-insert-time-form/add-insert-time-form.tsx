import { AddInsertTimeFormUI } from '@ui';
import { useForm } from '../../services/hooks/useForm';
import { FormEvent } from 'react';
import { useDispatch } from '../../services/store';
import {
	addTimer,
	postTimersListApi,
} from '../../services/slices/insertTimeSlice/insertTimeSlice';

export const AddInsertTimeForm = () => {
	const dispatch = useDispatch();
	const { values, handleChange } = useForm({ h: 0, m: 0, s: 0 });

	const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addTimer(values));
		postTimersListApi(values);
		history.back();
	};

	return (
		<AddInsertTimeFormUI
			values={values}
			handleChange={handleChange}
			handleSumbit={handleSumbit}
		/>
	);
};
