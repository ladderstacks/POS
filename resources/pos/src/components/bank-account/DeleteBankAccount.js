import React from 'react';
import {connect} from 'react-redux';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';
import { deleteBankAccount } from '../../store/action/bankAccountActions';

const DeleteBankAccount = (props) => {
    const {deleteBankAccount, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteBankAccount(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} title='Delete Bank Account'
                                         name={getFormattedMessage('bank-account.title')}/>}
        </div>
    )
};

export default connect(null, {deleteBankAccount})(DeleteBankAccount);
