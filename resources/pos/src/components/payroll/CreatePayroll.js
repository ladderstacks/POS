import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap-v5';
import {addPayroll} from '../../store/action/bankAccountActions';
import {getFormattedMessage} from '../../shared/sharedMethod';
import PayrollForm from './PayrollForm';
import { Filters } from '../../constants';

const CreatePayroll = (props) => {
    const {addPayroll} = props;
    const Dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);

    const addPayrollData = (bankAccountValue) => {
        Dispatch(addPayroll(bankAccountValue, Filters.OBJ));
    };

    return (
        <div className='text-end w-sm-auto me-2'>
            <Button variant='primary mb-lg-0 mb-md-0 mb-4' onClick={handleClose}>
                {getFormattedMessage('payroll.create.title')}
            </Button>
            <PayrollForm addPayrollData={addPayrollData} handleClose={handleClose} show={show}
                                 title={getFormattedMessage('payroll.create.title')}/>
        </div>

    )
};

export default connect(null, {addPayroll})(CreatePayroll);
