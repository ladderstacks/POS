import { apiBaseURL, bankAccountsActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import apiConfig from '../../config/apiConfig'
import { addInToTotalRecord, removeFromTotalRecord, setTotalRecord } from "./totalRecordAction";
import { addToast } from "./toastAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchBankAccounts =
    (filter = {}, isLoading = true) =>
        async (dispatch) => {
            if (isLoading) {
                dispatch(setLoading(true));
            }
            let url = apiBaseURL.BANK_ACCOUNTS;
            if (
                !_.isEmpty(filter) &&
                (
                    filter.page ||
                    filter.pageSize ||
                    filter.search ||
                    filter.order_By ||
                    filter.created_at
                )
            ) {
                url += requestParam(filter, null, null, null, url)
            }

            apiConfig
                .get(url)
                .then(response => {
                    dispatch({
                        type: bankAccountsActionType.FETCH_BANK_ACCOUNTS,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.meta.total))
                })
                .catch((response) => {
                    dispatch(
                        addToast({
                            text: response.response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                })
                .finally(() => {
                    if (isLoading) {
                        dispatch(setLoading(false));
                    }
                });
        }

export const fetchBankAccount = (bankAccountId, singleUser) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.BANK_ACCOUNTS + "/" + bankAccountId, singleUser)
        .then((response) => {
            dispatch({
                type: bankAccountsActionType.FETCH_BANK_ACCOUNT,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchBankAccountFromData = () => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.BANK_ACCOUNTS + "/form_data")
        .then((response) => {
            dispatch({
                type: bankAccountsActionType.FETCH_BANK_ACCOUNT_FORM_DATA_COUNTRY,
                payload: response.data.data.countries
            });
            dispatch({
                type: bankAccountsActionType.FETCH_BANK_ACCOUNT_FORM_DATA_CURRENCY,
                payload: response.data.data.currencies
            });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteBankAccount = (bankAccountId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.BANK_ACCOUNTS + "/" + bankAccountId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({
                type: bankAccountsActionType.DELETE_BANK_ACCOUNTS,
                payload: bankAccountId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("bank-account.success.delete.message"),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const addBankAccount = (bank_account) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.BANK_ACCOUNTS, bank_account)
        .then((response) => {
            dispatch({
                type: bankAccountsActionType.ADD_BANK_ACCOUNTS,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "bank-account.success.create.message"
                    ),
                })
            );
            dispatch(addInToTotalRecord(1));
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const editBankAccount =
    (bankAccountId, bankAccounts, handleClose) => async (dispatch) => {
        apiConfig
            .post(apiBaseURL.BANK_ACCOUNTS + "/" + bankAccountId, bankAccounts)
            .then((response) => {
                dispatch({
                    type: bankAccountsActionType.EDIT_BANK_ACCOUNTS,
                    payload: response.data.data
                });
                setTimeout(() => {
                    dispatch(
                        addToast({
                            text: getFormattedMessage("bank-account.success.edit.message"),
                        })
                    );
                }, 10);
                handleClose(false);
                dispatch(addInToTotalRecord(1));
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const exportBankAccounts = (isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    await apiConfig.get(`bank-account/excel` )
        .then((response) => {
            let link = window.document.createElement('a');
            link.href = response.data.data.bank_account_excel_url;
            link.target = '_blank';
            window.document.body.appendChild(link);
            link.click();
            link.remove();
            if (isLoading) {
                dispatch(setLoading(false))
            }
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};
