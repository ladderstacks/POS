import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap-v5';
import {addAttendance} from '../../store/action/attendanceActions';
import {getFormattedMessage} from '../../shared/sharedMethod';
import AttendanceForm from './AttendanceForm';
import { Filters } from '../../constants';

const CreateAttendance = (props) => {
    const {addAttendance} = props;
    const Dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);

    const addAttendanceData = (bankAccountValue) => {
        Dispatch(addAttendance(bankAccountValue, Filters.OBJ));
    };

    return (
        <div className='text-end w-sm-auto me-2'>
            <Button variant='primary mb-lg-0 mb-md-0 mb-4' onClick={handleClose}>
                {getFormattedMessage('attendance.create.title')}
            </Button>
            <AttendanceForm addAttendanceData={addAttendanceData} handleClose={handleClose} show={show}
                                 title={getFormattedMessage('attendance.create.title')}/>
        </div>

    )
};

export default connect(null, {addAttendance})(CreateAttendance);
