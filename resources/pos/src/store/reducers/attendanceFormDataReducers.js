import {attendancesActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case attendancesActionType.FETCH_ATTENDANCE_FORM_DATA:
            return action.payload;
        default:
            return state;
    }
};
