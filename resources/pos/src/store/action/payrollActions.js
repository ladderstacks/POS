import { apiBaseURL, payrollsActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import apiConfig from '../../config/apiConfig'
import { addInToTotalRecord, removeFromTotalRecord, setTotalRecord } from "./totalRecordAction";
import { addToast } from "./toastAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchPayrolls =
    (filter = {}, isLoading = true) =>
        async (dispatch) => {
            if (isLoading) {
                dispatch(setLoading(true));
            }
            let url = apiBaseURL.PAYROLLS;
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
                        type: payrollsActionType.FETCH_PAYROLLS,
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

export const fetchPayroll = (payrollId, singleUser) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.PAYROLLS + "/" + payrollId, singleUser)
        .then((response) => {
            dispatch({
                type: payrollsActionType.FETCH_BANK_ACCOUNT,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchPayrollFromData = () => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.PAYROLLS + "/form_data")
        .then((response) => {
            dispatch({
                type: payrollsActionType.FETCH_PAYROLL_FORM_DATA_BANK_ACCOUNT,
                payload: response.data.data.bank_accounts
            });
            dispatch({
                type: payrollsActionType.FETCH_PAYROLL_FORM_DATA_EMPLOYEE,
                payload: response.data.data.employees
            });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deletePayroll = (payrollId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.PAYROLLS + "/" + payrollId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({
                type: payrollsActionType.DELETE_PAYROLLS,
                payload: payrollId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("payroll.success.delete.message"),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const addPayroll = (payroll) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.PAYROLLS, payroll)
        .then((response) => {
            dispatch({
                type: payrollsActionType.ADD_PAYROLLS,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "payroll.success.create.message"
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

export const editPayroll =
    (payrollId, payrolls, handleClose) => async (dispatch) => {
        apiConfig
            .post(apiBaseURL.PAYROLLS + "/" + payrollId, payrolls)
            .then((response) => {
                dispatch({
                    type: payrollsActionType.EDIT_PAYROLLS,
                    payload: response.data.data
                });
                setTimeout(() => {
                    dispatch(
                        addToast({
                            text: getFormattedMessage("payroll.success.edit.message"),
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

export const exportPayrolls = (isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    await apiConfig.get(`payroll/excel` )
        .then((response) => {
            let link = window.document.createElement('a');
            link.href = response.data.data.payroll_excel_url;
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
