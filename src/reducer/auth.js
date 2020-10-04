import { CHECKING_AUTH, REMOVE_USER, SET_USER } from '../actions/action.types';

const initialState = {
	userData: null,
	isChecking: true,
};

export default function todosReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				userData: action.payload,
			};
		case REMOVE_USER:
			return {
				...state,
				userData: action.payload,
			};
		case CHECKING_AUTH:
			return {
				...state,
				isChecking: action.payload,
			};

		default:
			return state;
	}
}
