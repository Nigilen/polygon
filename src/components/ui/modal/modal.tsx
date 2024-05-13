import { FC } from 'react';
import styles from './modal.module.css';
import { TModalProps } from './type';
import closeSVG from '../../../assets/svg/close-modal.svg';

export const ModalUI: FC<TModalProps> = ({ children, onClose, title }) => (
	<>
		<div className={styles.wrapper}>
			<div className={styles.modal}>
				<button className={styles.button} type='button' onClick={onClose}>
					<img src={closeSVG} />
				</button>
				<h1>{title}</h1>
				<div>{children}</div>
			</div>
		</div>
		<div data-cy='overlay' className={styles.overlay} onClick={onClose} />
	</>
);
