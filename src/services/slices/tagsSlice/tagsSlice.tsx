import { createSlice } from '@reduxjs/toolkit';

type TTagsSlice = {
	tags: string[];
};

const initialState: TTagsSlice = {
	tags: ['work', 'study'],
};

export const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	selectors: {
		getTags: (state) => state.tags,
	},
	reducers: {},
});

export const { getTags } = tagsSlice.selectors;
export default tagsSlice.reducer;
