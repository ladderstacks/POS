import { connect } from "react-redux"
import { exportDepartments, fetchDepartments } from "../../store/action/departmentActions";
import MasterLayout from "../MasterLayout";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage, placeholderText } from "../../shared/sharedMethod";
import { useState } from "react";
import { Tokens } from "../../constants";
import TabTitle from "../../shared/tab-title/TabTitle";
import CreateDepartment from "./CreateDepartment";
import ActionButton from "../../shared/action-buttons/ActionButton";
import EditDepartment from "./EditDepartment";
import DeleteDepartment from "./DeleteDepartment";

const Department = (props) => {
    const {fetchDepartments, exportDepartments, departments, totalRecord, isLoading} = props

    const [deleteModel, setDeleteModel] = useState(false)
    const [isDelete, setIsDelete] = useState(null)
    const [editModel, setEditModel] = useState(false)
    const [department, setDepartment] = useState()
    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE)

    const handleClose = (item) => {
        setEditModel(!editModel)
        setDepartment(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    }

    const columns = [
        {
            name: getFormattedMessage('department.name.label'),
            sortField: 'name',
            sortable: true,
            selector: row => row.name,
        },
        {
            name: getFormattedMessage('department.description.label'),
            sortField: 'description',
            sortable: true,
            selector: row => row.description
        },
        {
            name: getFormattedMessage('department.status.label'),
            sortField: 'status',
            sortable: true,
            selector: row => row.status
        }
        ,
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
    const itemsValue = departments.length >= 0 && departments.map(item => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        status: item.attributes.status,
    }));
    const onChange = (filter) => {
        fetchDepartments(filter, true);
    };

    const onExcelClick = () => {
        exportDepartments();
    }

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('departments.title')}/>
                <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                                isEXCEL
                                onExcelClick={onExcelClick}
                                AddButton={<CreateDepartment/>}
                                totalRows={totalRecord}/>
                 <EditDepartment handleClose={handleClose} show={editModel} department={department}/>
                <DeleteDepartment onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                       onDelete={isDelete}/>
        </MasterLayout>
    )
}
const mapStateToProps = (state) => {
    const {departments, totalRecord, isLoading} = state;
    return {departments, totalRecord, isLoading};
}
export default connect(mapStateToProps, {fetchDepartments, exportDepartments})(Department);
