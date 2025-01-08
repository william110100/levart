import {
	PANIC_LIST
} from '../constants/ActionTypes';

const INIT_STATE = {
	loading: false,
	panics: null
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case PANIC_LIST: {
			return {
				...state,
				panics: action.payload,
			};
		}

		default:
			return state;
	}
};
