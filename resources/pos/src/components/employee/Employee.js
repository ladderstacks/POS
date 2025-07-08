import { connect } from "react-redux"
import MasterLayout from "../MasterLayout";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage, placeholderText } from "../../shared/sharedMethod";
import { useState } from "react";
import { Tokens } from "../../constants";
import TabTitle from "../../shared/tab-title/TabTitle";
import ActionButton from "../../shared/action-buttons/ActionButton";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";
import { fetchEmployees, exportEmployee } from "../../store/action/employeeActions";

const Employee = (props) => {
    const {fetchEmployees, exportEmployee, employees, totalRecord, isLoading} = props

    const [deleteModel, setDeleteModel] = useState(false)
    const [isDelete, setIsDelete] = useState(null)
    const [employee, setEmployee] = useState()
    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE)

    const handleClose = (item) => {
        const id = item.id;
        window.location.href = "#/app/employee/edit/" + id;
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    }

    const columns = [
        {
            name: getFormattedMessage('employee.employee-id'),
            sortField: 'employee_id',
            sortable: true,
            selector: row => row.employee_id,
        },
        {
            name: getFormattedMessage('employee.name'),
            sortField: 'full_name',
            sortable: true,
            selector: row => row.full_name,
        },
        {
            name: getFormattedMessage('employee.label.email'),
            sortField: 'email',
            sortable: true,
            selector: row => row.email,
        },
        {
            name: getFormattedMessage('employee.label.phone_number'),
            sortField: 'phone_number',
            sortable: true,
            selector: row => row.phone_number,
        },
        {
            name: getFormattedMessage('employee.label.job_title'),
            sortField: 'job_title',
            sortable: true,
            selector: row => row.job_title,
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
    const itemsValue = employees.length >= 0 && employees.map(item => ({
        id: item.id,
        full_name: item.attributes.full_name,
        employee_id: item.attributes.employee_id,
        fisrt_name: item.attributes.fisrt_name,
        middle_name: item.attributes.middle_name    ,
        last_name: item.attributes.last_name,
        date_of_birth: item.attributes.date_of_birth,
        nationality: item.attributes.nationality,
        marital_status: item.attributes.marital_status,
        emirates_id: item.attributes.emirates_id,
        passport_number: item.attributes.passport_number,
        gender: item.attributes.gender,
        email: item.attributes.email,
        phone_number: item.attributes.phone_number,
        alternate_phone_number: item.attributes.alternate_phone_number,
        emergency_contact_name: item.attributes.emergency_contact_name,
        address: item.attributes.address,
        country_id: item.attributes.country_id,
        hire_date: item.attributes.hire_date,
        job_title: item.attributes.job_title,
        department: item.attributes.department,
        employment_type: item.attributes.employment_type,
        reporting_manager_id: item.attributes.reporting_manager_id,
        employee_status: item.attributes.employee_status,
        termination_date: item.attributes.termination_date,
        exit_reason: item.attributes.exit_reason,
        created_at: item.attributes.created_at
    }));
    const onChange = (filter) => {
        fetchEmployees(filter, true);
    };

    const onExcelClick = () => {
        exportEmployee();
    }

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('employee.title')}/>
                <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                                to='#/app/employee/create'
                                isEXCEL
                                onExcelClick={onExcelClick}
                                ButtonValue={getFormattedMessage('employee.create.title')}
                                totalRows={totalRecord}/>
                <DeleteEmployee onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                       onDelete={isDelete}/>
        </MasterLayout>
    )
}
const mapStateToProps = (state) => {
    const {employees, totalRecord, isLoading} = state;
    return {employees, totalRecord, isLoading};
}
export default connect(mapStateToProps, {fetchEmployees, exportEmployee})(Employee);
