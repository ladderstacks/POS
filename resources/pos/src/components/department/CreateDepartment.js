import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap-v5';
import {addDepartment} from '../../store/action/bankAccountActions';
import {getFormattedMessage} from '../../shared/sharedMethod';
import DepartmentForm from './DepartmentForm';
import { Filters } from '../../constants';

const CreateDepartment = (props) => {
    const {addDepartment} = props;
    const Dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);

    const addDepartmentData = (bankAccountValue) => {
        Dispatch(addDepartment(bankAccountValue, Filters.OBJ));
    };

    return (
        <div className='text-end w-sm-auto me-2'>
            <Button variant='primary mb-lg-0 mb-md-0 mb-4' onClick={handleClose}>
                {getFormattedMessage('department.create.title')}
            </Button>
            <DepartmentForm addDepartmentData={addDepartmentData} handleClose={handleClose} show={show}
                                 title={getFormattedMessage('department.create.title')}/>
        </div>

    )
};

export default connect(null, {addDepartment})(CreateDepartment);
