import { FC, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'react-router-dom';
import styles from './insert-time-btn.module.css';
import editSVG from '../../../assets/svg/edit-timer.svg';
import delSVG from '../../../assets/svg/remove-timer.svg';

type TInsertTimeBtnUI = {
	s: number;
	m: number;
	h: number;
	onClick: (e: SyntheticEvent) => void;
	disabled: boolean;
	onEdit: (e: SyntheticEvent) => void;
	onDelete: (e: SyntheticEvent) => void;
	locationState: { background: Location };
};

export const InsertTimeBtnUI: FC<TInsertTimeBtnUI> = ({
	s,
	m,
	h,
	onClick,
	disabled,
	onEdit,
	onDelete,
	locationState,
}) => (
	<div className={styles.buttons}>
		<button
			className={styles.timerButton}
			type='button'
			onClick={onClick}
			disabled={disabled}
		>
			{String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:
			{String(s).padStart(2, '0')}
		</button>
		<div className={styles.editButtons}>
			<Link
				to='/edit-timer'
				relative='path'
				state={locationState}
				className={styles.link}
			>
				<button className={styles.button} type='button' onClick={onEdit}>
					<img src={editSVG} />
				</button>
			</Link>
			<button className={styles.button} type='button' onClick={onDelete}>
				<img src={delSVG} />
			</button>
		</div>
	</div>
);
