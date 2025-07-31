import apiConfig from "../../config/apiConfig";
import { apiBaseURL, constants, attendancesActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    setTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchAttendances =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.ATTENDANCES;
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
                    type: attendancesActionType.FETCH_ATTENDANCES,
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

export const fetchAttendance = (attendancesId, singleUser) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.ATTENDANCES + "/" + attendancesId, singleUser)
        .then((response) => {
            dispatch({
                type: attendancesActionType.FETCH_ATTENDANCE,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const addAttendance = (attendances) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.ATTENDANCES, attendances)
        .then((response) => {
            dispatch({
                type: attendancesActionType.ADD_ATTENDANCES,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("attendance.success.create.message"),
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

export const editAttendance =
    (attendancesId, attendances, handleClose) => async (dispatch) => {
        apiConfig
            .post(apiBaseURL.ATTENDANCES + "/" + attendancesId, attendances)
            .then((response) => {
                dispatch({type: attendancesActionType.EDIT_ATTENDANCES, payload: response.data.data});
                handleClose(false);
                dispatch(
                    addToast({
                        text: getFormattedMessage("attendance.success.edit.message"),
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

export const deleteAttendance = (attendancesId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.ATTENDANCES + "/" + attendancesId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({
                type: attendancesActionType.DELETE_ATTENDANCES,
                payload: attendancesId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("attendance.success.delete.message"),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchAllAttendances = () => async (dispatch) => {
    apiConfig
        .get(`attendances?page[size]=0`)
        .then((response) => {
            dispatch({
                type: attendancesActionType.FETCH_ALL_ATTENDANCES,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const exportAttendances = (isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true))
    }
    await apiConfig.get(`attendance/excel` )
        .then((response) => {
            let link = window.document.createElement('a');
            link.href = response.data.data.attendance_excel_url;
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

export const fetchAttendanceFromData = () => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.ATTENDANCES + "/form_data")
        .then((response) => {
            dispatch({
                type: attendancesActionType.FETCH_ATTENDANCE_FORM_DATA,
                payload: response.data.data
            });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
