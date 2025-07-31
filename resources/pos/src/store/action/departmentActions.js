import apiConfig from "../../config/apiConfig";
import { apiBaseURL, constants, departmentsActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    setTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchDepartments =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.DEPARTMENTS;
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at)
        ) {
            url += requestParam(filter, null, null, null, url);
        }
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: departmentsActionType.FETCH_DEPARTMENTS,
                    payload: response.data.data,
                });
                dispatch(
                    setTotalRecord(
                        response.data.meta.total !== undefined &&
                            response.data.meta.total >= 0
                            ? response.data.meta.total
                            : response.data.data.total
                    )
                );
                if (isLoading) {
                    dispatch(setLoading(false));
                }
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

export const fetchDepartment = (departmentsId, singleUser) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.DEPARTMENTS + "/" + departmentsId, singleUser)
        .then((response) => {
            dispatch({
                type: departmentsActionType.FETCH_DEPARTMENT,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const addDepartment = (departments) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.DEPARTMENTS, departments)
        .then((response) => {
            dispatch({
                type: departmentsActionType.ADD_DEPARTMENTS,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("department.success.create.message"),
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

export const editDepartment =
    (departmentsId, departments, handleClose) => async (dispatch) => {
        apiConfig
            .post(apiBaseURL.DEPARTMENTS + "/" + departmentsId, departments)
            .then((response) => {
                dispatch({type: departmentsActionType.EDIT_DEPARTMENTS, payload: response.data.data});
                handleClose(false);
                dispatch(
                    addToast({
                        text: getFormattedMessage("department.success.edit.message"),
                    })
                );
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

export const deleteDepartment = (departmentsId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.DEPARTMENTS + "/" + departmentsId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({
                type: departmentsActionType.DELETE_DEPARTMENTS,
                payload: departmentsId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("department.success.delete.message"),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchAllDepartments = () => async (dispatch) => {
    apiConfig
        .get(`departments?page[size]=0`)
        .then((response) => {
            dispatch({
                type: departmentsActionType.FETCH_ALL_DEPARTMENTS,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const exportDepartments = (isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    await apiConfig.get(`department/excel` )
        .then((response) => {
            let link = window.document.createElement('a');
            link.href = response.data.data.department_excel_url;
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
