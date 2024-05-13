import { ChangeEvent, FC, FormEvent } from 'react';
import { TTimer } from '../../../services/slices/insertTimeSlice/insertTimeSlice';
import styles from './add-insert-time-form.module.css';

type TAddInsertTimeFormUI = {
	values: TTimer;
	handleSumbit: (e: FormEvent<HTMLFormElement>) => void;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const AddInsertTimeFormUI: FC<TAddInsertTimeFormUI> = ({
	values,
	handleSumbit,
	handleChange,
}) => (
	<form onSubmit={handleSumbit} className={styles.form}>
		<div className={styles.inputs}>
			{Object.keys(values).map((i, index) => (
				<input
					className={styles.input}
					type='number'
					name={i}
					value={Object.values(values)[index]}
					min={0}
					max={60}
					placeholder={i}
					onChange={handleChange}
					key={index}
				/>
			))}
		</div>
		<button className={styles.button} type='submit'>
			ADD
		</button>
	</form>
);
