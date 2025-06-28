import { apiBaseURL, bankAccountsActionType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import apiConfig from '../../config/apiConfig'
import { addInToTotalRecord, setTotalRecord } from "./totalRecordAction";
import { addToast } from "./toastAction";

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
