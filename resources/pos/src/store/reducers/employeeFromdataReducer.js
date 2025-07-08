import { employeeActionType } from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case employeeActionType.FETCH_EMPLOYEE_FORM_DATA:
            return action.payload;
        default:
            return state;
    }
}
