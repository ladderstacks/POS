import {connect} from 'react-redux';
import {fetchAttendance} from '../../store/action/attendanceActions';
import {getFormattedMessage} from '../../shared/sharedMethod';
import AttendanceForm from './AttendanceForm';

const EditAttendance = (props) => {
    const {handleClose, show, attendance} = props;

    return (
        <>
            {attendance && <AttendanceForm handleClose={handleClose} show={show} singleAttendance={attendance}
                                  title={getFormattedMessage('attendance.edit.title')}/>}
        </>
    )
};

export default connect(null, {fetchAttendance})(EditAttendance);

