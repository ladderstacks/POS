import {attendancesActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case attendancesActionType.FETCH_ATTENDANCES:
            return action.payload;
        case attendancesActionType.FETCH_ATTENDANCE:
            return action.payload;
        case attendancesActionType.ADD_ATTENDANCES:
            return [...state, action.payload];
        case attendancesActionType.EDIT_ATTENDANCES:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case attendancesActionType.DELETE_ATTENDANCES:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};
