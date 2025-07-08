import { payrollsActionType } from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case payrollsActionType.FETCH_PAYROLL_FORM_DATA_BANK_ACCOUNT:
            return action.payload;
        default:
            return state;
    }
}
