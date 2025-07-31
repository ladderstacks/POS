import {departmentsActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case departmentsActionType.FETCH_DEPARTMENTS:
            return action.payload;
        case departmentsActionType.FETCH_DEPARTMENT:
            return action.payload;
        case departmentsActionType.ADD_DEPARTMENTS:
            return [...state, action.payload];
        case departmentsActionType.EDIT_DEPARTMENTS:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case departmentsActionType.DELETE_DEPARTMENTS:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};
