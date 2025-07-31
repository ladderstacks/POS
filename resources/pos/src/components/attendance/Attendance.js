import { connect, useSelector } from "react-redux"
import { exportAttendances, fetchAttendances } from "../../store/action/attendanceActions";
import MasterLayout from "../MasterLayout";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage, placeholderText } from "../../shared/sharedMethod";
import { useEffect, useState } from "react";
import { Tokens } from "../../constants";
import TabTitle from "../../shared/tab-title/TabTitle";
import CreateAttendance from "./CreateAttendance";
import ActionButton from "../../shared/action-buttons/ActionButton";
import EditAttendance from "./EditAttendance";
import DeleteAttendance from "./DeleteAttendance";
import moment from "moment";

const Attendance = (props) => {
    const {fetchAttendances, exportAttendances, attendances, totalRecord, isLoading} = props

    const [deleteModel, setDeleteModel] = useState(false)
    const [isDelete, setIsDelete] = useState(null)
    const [editModel, setEditModel] = useState(false)
    const [attendance, setAttendance] = useState()
    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE)
    const { allConfigData } = useSelector((state) => state);
    const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');

    useEffect(() => {
        setDateFormat(format(allConfigData));
    }, [allConfigData])
    const handleClose = (item) => {
        setEditModel(!editModel)
        setAttendance(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    }

    const format = (allConfigData) => {
        const format = allConfigData && allConfigData.date_format;
        if (format === "d-m-y") {
            return "dd-MM-yyyy";
        } else if (format === "m-d-y") {
            return "MM-dd-yyyy";
        } else if (format === "y-m-d") {
            return "yyyy-MM-dd";
        } else if (format === "m/d/y") {
            return "MM/dd/yyyy";
        } else if (format === "d/m/y") {
            return "dd/MM/yyyy";
        } else if (format === "y/m/d") {
            return "yyyy/MM/dd";
        } else if (format === "m.d.y") {
            return "MM.dd.yyyy";
        } else if (format === "d.m.y") {
            return "dd.MM.yyyy";
        } else if (format === "y.m.d") {
            return "yyyy.MM.dd";
        } else {return "yyyy-mm-dd"};
    };

    const columns = [
        {
            name: getFormattedMessage('attendance.employe_name.label'),
            sortField: 'employee_name',
            sortable: true,
            selector: row => row.employee_name,
        },
        {
            name: getFormattedMessage('attendance.date.label'),
            sortField: 'date',
            sortable: true,
            selector: row => row.formated_date
        },
        {
            name: getFormattedMessage('attendance.clock-in.label'),
            sortField: 'status',
            sortable: false,
            selector: row => row.formated_clock_in
        },
        {
            name: getFormattedMessage('attendance.clock-out.label'),
            sortField: 'status',
            sortable: false,
            selector: row => row.formated_clock_out
        },
        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <ActionButton item={row} goToEditProduct={handleClose} isEditMode={true}
                                      onClickDeleteModel={onClickDeleteModel} />
        }
    ];
    const itemsValue = attendances.length >= 0 && attendances.map(item => ({
        id: item.id,
        employee_id: item.attributes.employee_id,
        employee_name: item.attributes.employee_name,
        date: item.attributes.date,
        clock_in: item.attributes.clock_in,
        clock_out: item.attributes.clock_out,
        formated_date: item.attributes.formated_date,
        formated_clock_in: item.attributes.formated_clock_in,
        formated_clock_out: item.attributes.formated_clock_out,
    }));
    const onChange = (filter) => {
        fetchAttendances(filter, true);
    };

    const onExcelClick = () => {
        exportAttendances();
    }

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('attendances.title')}/>
                <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                                // isEXCEL
                                // onExcelClick={onExcelClick}
                                AddButton={<CreateAttendance/>}
                                totalRows={totalRecord}/>
                 <EditAttendance handleClose={handleClose} show={editModel} attendance={attendance}/>
                <DeleteAttendance onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                       onDelete={isDelete}/>
        </MasterLayout>
    )
}
const mapStateToProps = (state) => {
    const {attendances, totalRecord, isLoading} = state;
    return {attendances, totalRecord, isLoading};
}
export default connect(mapStateToProps, {fetchAttendances, exportAttendances})(Attendance);
