import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'react-router-dom';
import styles from './add-insert-time-btn.module.css';
import addSVG from '../../../assets/svg/plus.svg';

type TAddInsertTimeBtnUI = {
	locationState: { background: Location };
};

export const AddInsertTimeBtnUI: FC<TAddInsertTimeBtnUI> = ({
	locationState,
}) => (
	<Link to='/add-timer' relative='path' state={locationState}>
		<button className={styles.button} type='button'>
			<img src={addSVG} />
		</button>
	</Link>
);
