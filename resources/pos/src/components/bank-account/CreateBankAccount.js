import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap-v5';
import {addBankAccount} from '../../store/action/bankAccountActions';
import ProductCategoryFrom from './ProductCategoryForm';
import {getFormattedMessage} from '../../shared/sharedMethod';

const CreateBankAccount = (props) => {
    const {addBankAccount} = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);

    const addProductData = (productValue) => {
        addBankAccount(productValue);
    };

    return (
        <div className='text-end w-sm-auto w-100'>
            <Button variant='primary mb-lg-0 mb-md-0 mb-4' onClick={handleClose}>
                {getFormattedMessage('product-category.create.title')}
            </Button>
            <ProductCategoryFrom addProductData={addProductData} handleClose={handleClose} show={show}
                                 title={getFormattedMessage('product-category.create.title')}/>
        </div>

    )
};

export default connect(null, {addBankAccount})(CreateBankAccount);
