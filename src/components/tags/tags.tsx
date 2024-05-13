import { ChangeEvent, useEffect, useState } from 'react';
import { TagsUI } from '../ui/tags';
import { useDispatch, useSelector } from '../../services/store';
import { getTags } from '../../services/slices/tagsSlice/tagsSlice';
import { setTag } from '../../services/slices/timerSlice/timerSlice';

export const Tags = () => {
	const tags = useSelector(getTags);
	const [value, setValue] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setTag('work'));
	}, []);

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setValue(e.target.value);
		dispatch(setTag(e.target.value));
	};

	return <TagsUI value={value} handleChange={handleChange} tags={tags} />;
};
