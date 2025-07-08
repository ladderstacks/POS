import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap-v5';
import {addBankAccount} from '../../store/action/bankAccountActions';
import {getFormattedMessage} from '../../shared/sharedMethod';
import BankAccountForm from './BankAccountForm';
import { Filters } from '../../constants';

const CreateBankAccount = (props) => {
    const {addBankAccount} = props;
    const Dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);

    const addBankAccountData = (bankAccountValue) => {
        Dispatch(addBankAccount(bankAccountValue, Filters.OBJ));
    };

    return (
        <div className='text-end w-sm-auto me-2'>
            <Button variant='primary mb-lg-0 mb-md-0 mb-4' onClick={handleClose}>
                {getFormattedMessage('bank-account.create.title')}
            </Button>
            <BankAccountForm addBankAccountData={addBankAccountData} handleClose={handleClose} show={show}
                                 title={getFormattedMessage('bank-account.create.title')}/>
        </div>

    )
};

export default connect(null, {addBankAccount})(CreateBankAccount);
