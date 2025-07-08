import React from 'react';
import {connect} from 'react-redux';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';
import { deletePayroll } from '../../store/action/payrollActions';

const DeletePayroll = (props) => {
    const {deletePayroll, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deletePayroll(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} title='Delete Bank Account'
                                         name={getFormattedMessage('payroll.title')}/>}
        </div>
    )
};

export default connect(null, {deletePayroll})(DeletePayroll);
