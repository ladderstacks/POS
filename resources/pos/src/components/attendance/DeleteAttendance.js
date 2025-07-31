import React from 'react';
import {connect} from 'react-redux';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';
import { deleteAttendance } from '../../store/action/attendanceActions';

const DeleteAttendance = (props) => {
    const {deleteAttendance, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteAttendance(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} title='Delete Bank Account'
                                         name={getFormattedMessage('attendance.title')}/>}
        </div>
    )
};

export default connect(null, {deleteAttendance})(DeleteAttendance);
