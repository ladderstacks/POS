import { bankAccountsActionType } from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bankAccountsActionType.FETCH_BANK_ACCOUNT_FORM_DATA_CURRENCY:
            return action.payload;
        default:
            return state;
    }
}
