import { connect } from "react-redux"
import { exportBankAccounts, fetchBankAccounts } from "../../store/action/bankAccountActions";
import MasterLayout from "../MasterLayout";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage, placeholderText } from "../../shared/sharedMethod";
import { useState } from "react";
import { Tokens } from "../../constants";
import TabTitle from "../../shared/tab-title/TabTitle";
import CreateBankAccount from "./CreateBankAccount";
import ActionButton from "../../shared/action-buttons/ActionButton";
import EditBankAccount from "./EditBankAccount";
import DeleteBankAccount from "./DeleteBankAccount";

const BankAccount = (props) => {
    const {fetchBankAccounts, exportBankAccounts, bankAccounts, totalRecord, isLoading} = props

    const [deleteModel, setDeleteModel] = useState(false)
    const [isDelete, setIsDelete] = useState(null)
    const [editModel, setEditModel] = useState(false)
    const [bankAccount, setBankAccount] = useState()
    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE)

    const handleClose = (item) => {
        setEditModel(!editModel)
        setBankAccount(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    }

    const columns = [
        {
            name: getFormattedMessage('bank-account.title'),
            sortField: 'bank_name',
            sortable: true,
            selector: row => row.bank_name,
        },
        {
            name: getFormattedMessage('bank-account.account-holder-name'),
            sortField: 'account_holder_name',
            sortable: true,
            selector: row => row.account_holder_name
        },
        {
            name: getFormattedMessage('bank-account.account-number'),
            sortField: 'account_number',
            sortable: true,
            selector: row => row.account_number
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
    const itemsValue = bankAccounts.length >= 0 && bankAccounts.map(item => ({
        id: item.id,
        bank_name: item.attributes.bank_name,
        account_holder_name: item.attributes.account_holder_name,
        account_number: item.attributes.account_number,
        account_type: item.attributes.account_type,
        bank_branch: item.attributes.bank_branch,
        routing_number: item.attributes.routing_number,
        currency_id: item.attributes.currency_id,
        country_id: item.attributes.country_id,
        is_primary_account: item.attributes.is_primary_account,
        note: item.attributes.note,
    }));
    const onChange = (filter) => {
        fetchBankAccounts(filter, true);
    };

    const onExcelClick = () => {
        exportBankAccounts();
    }

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('bank-accounts.title')}/>
                <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                                isEXCEL
                                onExcelClick={onExcelClick}
                                AddButton={<CreateBankAccount/>}
                                totalRows={totalRecord}/>
                 <EditBankAccount handleClose={handleClose} show={editModel} bankAccount={bankAccount}/>
                <DeleteBankAccount onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                       onDelete={isDelete}/>
        </MasterLayout>
    )
}
const mapStateToProps = (state) => {
    const {bankAccounts, totalRecord, isLoading} = state;
    return {bankAccounts, totalRecord, isLoading};
}
export default connect(mapStateToProps, {fetchBankAccounts, exportBankAccounts})(BankAccount);
