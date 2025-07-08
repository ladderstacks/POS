import React from 'react';
import {connect} from 'react-redux';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';
import { deleteDepartment } from '../../store/action/departmentActions';

const DeleteDepartment = (props) => {
    const {deleteDepartment, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteDepartment(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} title='Delete Bank Account'
                                         name={getFormattedMessage('department.title')}/>}
        </div>
    )
};

export default connect(null, {deleteDepartment})(DeleteDepartment);
