import {connect} from 'react-redux';
import {fetchBrand} from '../../store/action/brandsAction';
import {getFormattedMessage} from '../../shared/sharedMethod';
import BankAccountForm from './BankAccountForm';

const EditBankAccount = (props) => {
    const {handleClose, show, bankAccount} = props;

    return (
        <>
            {bankAccount && <BankAccountForm handleClose={handleClose} show={show} singleBankAccount={bankAccount}
                                  title={getFormattedMessage('bank-account.edit.title')}/>}
        </>
    )
};

export default connect(null, {fetchBrand})(EditBankAccount);

