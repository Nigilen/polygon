import { ChangeEvent, useState } from 'react';

export function useForm<T>(initValues: T) {
	const [values, setValues] = useState(initValues);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	return { values, handleChange, setValues };
}
