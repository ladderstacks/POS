import { apiBaseURL, employeeActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import apiConfig from '../../config/apiConfig'
import { addInToTotalRecord, removeFromTotalRecord, setTotalRecord } from "./totalRecordAction";
import { addToast } from "./toastAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchEmployees =
    (filter = {}, isLoading = true) =>
        async (dispatch) => {
            if (isLoading) {
                dispatch(setLoading(true));
            }
            let url = apiBaseURL.EMPLOYEE;
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
                        type: employeeActionType.FETCH_EMPLOYEES,
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

export const fetchEmployee = (employeeId, singleUser, isloading = true) => async (dispatch) => {
    if (isloading) {
        dispatch(setLoading(true));
    }
    apiConfig
        .get(apiBaseURL.EMPLOYEE + "/" + employeeId, singleUser)
        .then((response) => {
            dispatch({
                type: employeeActionType.FETCH_EMPLOYEE,
                payload: response.data.data,
            });
            if (isloading) {
                dispatch(setLoading(false));
            }
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchEmployeeFromData = (id = '') => async (dispatch) => {
    apiConfig
            .get(apiBaseURL.EMPLOYEE + "/form_data/"+ id)
            .then((response) => {
                dispatch({
                    type: employeeActionType.FETCH_EMPLOYEE_FORM_DATA,
                    payload: response.data.data
                });
            })
            .catch(({ response }) => {
                dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            });
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.EMPLOYEE + "/" + employeeId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({
                type: employeeActionType.DELETE_EMPLOYEES,
                payload: employeeId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("employee.success.delete.message"),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const addEmployee = (employee, navigate, setIsloading) => async (dispatch) => {
    setIsloading(true);
    await apiConfig
        .post(apiBaseURL.EMPLOYEE, employee)
        .then((response) => {
            dispatch({
                type: employeeActionType.ADD_EMPLOYEES,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "employee.success.create.message"
                    ),
                })
            );
            navigate("/app/employee");
            setIsloading(false);
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
            setIsloading(false);
        });
};

export const editEmployee =
    (employeeId, employee, navigate, setIsloading) => async (dispatch) => {
        setIsloading(true);
        apiConfig
            .post(apiBaseURL.EMPLOYEE + "/" + employeeId, employee)
            .then((response) => {
                setTimeout(()=> {
                    dispatch(
                        addToast({
                            text: getFormattedMessage("employee.success.edit.message"),
                        })
                    );
                }, 10);
                navigate("/app/employee");
                dispatch(addInToTotalRecord(1));
                setIsloading(false);
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
                setIsloading(false);
            });
    };

export const exportEmployee = (isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    await apiConfig.get(`employee/excel` )
        .then((response) => {
            let link = window.document.createElement('a');
            link.href = response.data.data.employee_excel_url;
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
