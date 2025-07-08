import { connect } from "react-redux"
import { exportPayrolls, fetchPayrolls } from "../../store/action/payrollActions";
import MasterLayout from "../MasterLayout";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage, placeholderText } from "../../shared/sharedMethod";
import { useState } from "react";
import { Tokens } from "../../constants";
import TabTitle from "../../shared/tab-title/TabTitle";
import CreatePayroll from "./CreatePayroll";
import ActionButton from "../../shared/action-buttons/ActionButton";
import EditPayroll from "./EditPayroll";
import DeletePayroll from "./DeletePayroll";

const Payroll = (props) => {
    const {fetchPayrolls, exportPayrolls, payrolls, totalRecord, isLoading} = props

    const [deleteModel, setDeleteModel] = useState(false)
    const [isDelete, setIsDelete] = useState(null)
    const [editModel, setEditModel] = useState(false)
    const [payroll, setPayroll] = useState()
    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE)

    const handleClose = (item) => {
        setEditModel(!editModel)
        setPayroll(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    }

    const columns = [
        {
            name: getFormattedMessage('payroll.employe_name.label'),
            sortField: 'first_name',
            sortable: true,
            selector: row => row.employee_name,
        },
        {
            name: getFormattedMessage('payroll.basic_salary.label'),
            sortField: 'basic_salary',
            sortable: true,
            selector: row => row.basic_salary
        },
        {
            name: getFormattedMessage('payroll.bank_account.label'),
            sortField: 'account_holder_name',
            sortable: true,
            selector: row => row.bank_account
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
    const itemsValue = payrolls.length >= 0 && payrolls.map(item => ({
        id: item.id,
        employee_id: item.attributes.employee_id,
        employee_name: item.attributes.employee_name,
        basic_salary: item.attributes.basic_salary,
        bank_account_id: item.attributes.bank_account_id,
        bank_account: item.attributes.bank_account,
        tax_identification_number: item.attributes.tax_identification_number,
        payment_method: item.attributes.payment_method,
        benefits: item.attributes.benefits,
    }));
    const onChange = (filter) => {
        fetchPayrolls(filter, true);
    };

    const onExcelClick = () => {
        exportPayrolls();
    }

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('payrolls.title')}/>
                <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                                isEXCEL
                                onExcelClick={onExcelClick}
                                AddButton={<CreatePayroll/>}
                                totalRows={totalRecord}/>
                 <EditPayroll handleClose={handleClose} show={editModel} payroll={payroll}/>
                <DeletePayroll onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                       onDelete={isDelete}/>
        </MasterLayout>
    )
}
const mapStateToProps = (state) => {
    const {payrolls, totalRecord, isLoading} = state;
    return {payrolls, totalRecord, isLoading};
}
export default connect(mapStateToProps, {fetchPayrolls, exportPayrolls})(Payroll);
