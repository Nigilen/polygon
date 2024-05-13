import { ChangeEvent, FC } from 'react';
import styles from './tags.module.css';

type TagsUIPorps = {
	value: any;
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	tags: string[];
};

export const TagsUI: FC<TagsUIPorps> = ({ value, handleChange, tags }) => (
	<select value={value} onChange={handleChange} className={styles.select}>
		{tags.map((i, index) => (
			<option key={index} value={i}>
				{i}
			</option>
		))}
	</select>
);
