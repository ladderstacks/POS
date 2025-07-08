import {payrollsActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case payrollsActionType.FETCH_PAYROLLS:
            return action.payload;
        case payrollsActionType.FETCH_PAYROLL:
            return action.payload;
        case payrollsActionType.ADD_PAYROLLS:
            return [...state, action.payload];
        case payrollsActionType.EDIT_PAYROLLS:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case payrollsActionType.DELETE_PAYROLLS:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};
