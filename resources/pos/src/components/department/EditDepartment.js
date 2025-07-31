import {connect} from 'react-redux';
import {fetchDepartment} from '../../store/action/departmentActions';
import {getFormattedMessage} from '../../shared/sharedMethod';
import DepartmentForm from './DepartmentForm';

const EditDepartment = (props) => {
    const {handleClose, show, department} = props;

    return (
        <>
            {department && <DepartmentForm handleClose={handleClose} show={show} singleDepartment={department}
                                  title={getFormattedMessage('department.edit.title')}/>}
        </>
    )
};

export default connect(null, {fetchDepartment})(EditDepartment);

