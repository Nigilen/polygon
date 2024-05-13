import { ModalUI } from '@ui';
import { TModalProps } from '../ui/modal/type';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = ({ children, onClose, title }) => {
	useEffect(() => {
		const pushEscClose = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', pushEscClose);
		return () => {
			document.removeEventListener('keydown', pushEscClose);
		};
	}, []);

	return createPortal(
		<ModalUI onClose={onClose} title={title}>
			{children}
		</ModalUI>,
		modalRoot as HTMLDivElement
	);
};
