import { Routes, Route, useLocation } from 'react-router-dom';
import { IndexPage } from '../../pages/index/index';
import { Modal } from '../modal/modal';
import { AddInsertTimeForm } from '../add-insert-time-form/add-insert-time-form';
import { EditInsertTimeForm } from '../edit-insert-time-form/edit-insert-time-form';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getTimersList } from '../../services/slices/insertTimeSlice/insertTimeSlice';

export const App = () => {
	const location = useLocation();
	const background = location.state?.background;
	const dispatch = useDispatch();
	useEffect(() => {
		// dispatch(getAllTimers());
		dispatch(getTimersList());
	}, [dispatch]);

	return (
		<>
			<Routes location={background || location}>
				<Route path='/' element={<IndexPage />} />
				<Route path='/add-timer' element={<AddInsertTimeForm />} />
				<Route path='/edit-timer' element={<EditInsertTimeForm />} />
				{/* <Route path='/statistics' element={<Statistics />} /> */}
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/add-timer'
						element={
							<Modal onClose={() => history.back()} title='Add Timer'>
								<AddInsertTimeForm />
							</Modal>
						}
					/>
					<Route
						path='/edit-timer'
						element={
							<Modal onClose={() => history.back()} title='Edit Timer'>
								<EditInsertTimeForm />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};
