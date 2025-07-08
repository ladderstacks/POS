import {bankAccountsActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bankAccountsActionType.FETCH_BANK_ACCOUNTS:
            return action.payload;
        case bankAccountsActionType.FETCH_BANK_ACCOUNT:
            return action.payload;
        case bankAccountsActionType.ADD_BANK_ACCOUNTS:
            return [...state, action.payload];
        case bankAccountsActionType.EDIT_BANK_ACCOUNTS:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case bankAccountsActionType.DELETE_BANK_ACCOUNTS:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};
