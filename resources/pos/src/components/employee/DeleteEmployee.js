import React from 'react';
import {connect} from 'react-redux';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';
import { deleteEmployee } from '../../store/action/employeeActions';

const DeleteEmployee = (props) => {
    const {deleteEmployee, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteEmployee(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} title='Delete Employee'
                                         name={getFormattedMessage('employee.title')}/>}
        </div>
    )
};

export default connect(null, {deleteEmployee})(DeleteEmployee);
