import { connect } from "react-redux"
import { fetchBankAccounts } from "../../store/action/bankAccountActions";
import MasterLayout from "../MasterLayout";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage, placeholderText } from "../../shared/sharedMethod";
import { useState } from "react";

const BankAccount = (props) => {
    const {fetchBankAccounts, bankAccounts, totalRecord, isLoading} = props

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
            selector: row => row.bank_name,
        },
        {
            name: getFormattedMessage('bank-account.account-holder-name'),
            selector: row => row.account_holder_name
        },
        {
            name: getFormattedMessage('bank-account.account-number'),
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
                                      onClickDeleteModel={onClickDeleteModel}/>
        }
    ];
    const itemsValue = [];
    const onChange = () => {

    }

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('bank-accounts.title')}/>
                <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                                AddButton={<CreateBankAccount/>}
                                totalRows={totalRecord}/>
                <EditBankAccount handleClose={handleClose} show={editModel} bankAccount={BankAccount}/>
                <DeleteBankAccount onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                       onDelete={isDelete}/>
        </MasterLayout>
    )
}
const mapStateToProps = (state) => {
    const {bankAccounts, totalRecord, isLoading} = state;
    return {bankAccounts, totalRecord, isLoading};
}
export default connect(mapStateToProps, {fetchBankAccounts})(BankAccount);
