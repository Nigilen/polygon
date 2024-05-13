import { InsertTimeBtn } from '../../components/insert-time-btn/insert-time-btn';
import { Timer } from '../../components/timer/timer';
import { AddInsertTimeBtn } from '../../components/add-insert-time-btn/add-insert-time-btn';
import styles from './index.module.css';
import { useForm } from '../../services/hooks/useForm';

export const IndexPage = () => {
	const { values, handleChange, setValues } = useForm({ h: 0, m: 0, s: 0 });

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.space} />
				<Timer
					values={values}
					handleChange={handleChange}
					setValues={setValues}
				/>
				<div className={styles.buttons}>
					<InsertTimeBtn setValues={setValues} />
					<AddInsertTimeBtn />
				</div>
			</div>
			{/* <Link to="/statistics">
				<button type='button'>Statistics</button>
			</Link> */}
		</>
	);
};
