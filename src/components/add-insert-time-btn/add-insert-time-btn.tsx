import { AddInsertTimeBtnUI } from '@ui';
import { useLocation } from 'react-router-dom';

export const AddInsertTimeBtn = () => {
	const location = useLocation();

	return (
		<>
			<AddInsertTimeBtnUI locationState={{ background: location }} />
		</>
	);
};
