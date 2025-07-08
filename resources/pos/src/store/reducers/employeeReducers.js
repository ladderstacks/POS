import {employeeActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case employeeActionType.FETCH_EMPLOYEES:
            return action.payload;
        case employeeActionType.FETCH_EMPLOYEE:
            return action.payload;
        case employeeActionType.ADD_EMPLOYEES:
            return [...state, action.payload];
        case employeeActionType.EDIT_EMPLOYEES:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case employeeActionType.DELETE_EMPLOYEES:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};
