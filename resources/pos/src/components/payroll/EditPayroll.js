import {connect} from 'react-redux';
import {fetchPayroll} from '../../store/action/payrollActions';
import {getFormattedMessage} from '../../shared/sharedMethod';
import PayrollForm from './PayrollForm';

const EditPayroll = (props) => {
    const {handleClose, show, payroll} = props;

    return (
        <>
            {payroll && <PayrollForm handleClose={handleClose} show={show} singlePayroll={payroll}
                                  title={getFormattedMessage('payroll.edit.title')}/>}
        </>
    )
};

export default connect(null, {fetchPayroll})(EditPayroll);

