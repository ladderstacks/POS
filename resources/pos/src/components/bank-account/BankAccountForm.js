import React, {useState, createRef, useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {Form, Modal} from 'react-bootstrap-v5';
import { editBankAccount, addBankAccount, fetchBankAccounts, fetchBankAccount, fetchBankAccountFromData } from '../../store/action/bankAccountActions';
import user from '../../assets/images/brand_logo.png';
import {getFormattedMessage} from '../../shared/sharedMethod';
import {placeholderText} from '../../shared/sharedMethod';
import ModelFooter from '../../shared/components/modelFooter';
import ReactSelect from '../../shared/select/reactSelect';
import apiConfig from '../../config/apiConfig'
import { apiBaseURL } from '../../constants';
import { addToast } from '../../store/action/toastAction';

const BankAccountForm = (props) => {
    const {handleClose, show, title, addBankAccount, editBankAccount, singleBankAccount, fetchBankAccountFromData} = props;
    const innerRef = createRef();
    const bankAccountCurrencies = useSelector(state => state.bankAccountCurrencies)
    const bankAccountCountries = useSelector(state => state.bankAccountCountries)

    const valid_account_types = ['Savings','Current','Business'];
    const accountTypes = [
        {
            value: 'Savings',
            label: 'Savings'
        },
        {
            value: 'Current',
            label: 'Current'
        },
        {
            value: 'Business',
            label: 'Business'
        },
    ]

    const [formValue, setFormValue] = useState({
        bank_name: singleBankAccount ? singleBankAccount.bank_name : '',
        account_holder_name: singleBankAccount ? singleBankAccount.account_holder_name : '',
        account_number: singleBankAccount ? singleBankAccount.account_number : '',
        account_type: singleBankAccount ? (singleBankAccount.account_type ? { label: singleBankAccount.account_type, value: singleBankAccount.account_type} : null) : '',
        bank_branch: singleBankAccount ? singleBankAccount.bank_branch : '',
        routing_number: singleBankAccount ? singleBankAccount.routing_number : '',
        currency_id: singleBankAccount ? singleBankAccount.currency_id : '',
        country_id: singleBankAccount ? singleBankAccount.country_id : '',
        is_primary_account: singleBankAccount ? singleBankAccount.is_primary_account : '',
        note: singleBankAccount ? singleBankAccount.note : '',
    });

    useEffect(()=> {
        fetchBankAccountFromData();
        setFormValue({
            ...formValue,
            currency_id: (singleBankAccount ? (singleBankAccount.currency_id ? bankAccountCurrencies.find(x => x.value == singleBankAccount.currency_id) : '') : ''),
            country_id: (singleBankAccount ? (singleBankAccount.country_id ? bankAccountCountries.find(x => x.value == singleBankAccount.country_id) : '') : ''),
        });
        console.log(formValue);

    }, [])

    const [errors, setErrors] = useState({
        bank_name: '',
        account_holder_name: '',
        account_number: '',
        account_type: '',
        bank_branch: '',
        routing_number: '',
        currency_id: '',
        country_id: '',
        is_primary_account: '',
        note: '',
    });

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!formValue['bank_name'].trim()) {
            errorss['bank_name'] = getFormattedMessage('bank-account.input.bank_name.validate.empty');
        } else if ((formValue['bank_name'] && formValue['bank_name'].length > 50)) {
            errorss['bank_name'] = getFormattedMessage('bank-account.bank_name.valid.validate.label');
        }

        if (!formValue['account_holder_name'].trim()) {
            errorss['account_holder_name'] = getFormattedMessage('bank-account.input.account_holder_name.validate.empty');
        } else if ((formValue['account_holder_name'] && formValue['account_holder_name'].length > 50)) {
            errorss['account_holder_name'] = getFormattedMessage('bank-account.account_holder_name.valid.validate.label');
        }

        if (!formValue['account_number'].trim()) {
            errorss['account_number'] = getFormattedMessage('bank-account.input.account_number.validate.empty');
        } else if ((formValue['account_number'] && formValue['account_number'].length > 50)) {
            errorss['account_number'] = getFormattedMessage('bank-account.account_number.valid.validate.label');
        }

        if (!formValue['account_type']) {
            errorss['account_type'] = getFormattedMessage('bank-account.input.account_type.validate.empty');
        } else if ((formValue['account_type'] && !valid_account_types.includes(formValue['account_type'].value))) {
            errorss['account_type'] = getFormattedMessage('bank-account.account_type.valid.validate.label');
        }

        if (!formValue['bank_branch'].trim()) {
            errorss['bank_branch'] = getFormattedMessage('bank-account.input.bank_branch.validate.empty');
        } else if ((formValue['bank_branch'] && formValue['bank_branch'].length > 50)) {
            errorss['bank_branch'] = getFormattedMessage('bank-account.bank_branch.valid.validate.label');
        }

        if (!formValue['routing_number'].trim()) {
            errorss['routing_number'] = getFormattedMessage('bank-account.input.routing_number.validate.empty');
        } else if ((formValue['routing_number'] && formValue['routing_number'].length > 50)) {
            errorss['routing_number'] = getFormattedMessage('bank-account.routing_number.valid.validate.label');
        }

        if (!formValue['routing_number'].trim()) {
            errorss['routing_number'] = getFormattedMessage('bank-account.input.routing_number.validate.empty');
        } else if ((formValue['routing_number'] && formValue['routing_number'].length > 50)) {
            errorss['routing_number'] = getFormattedMessage('bank-account.routing_number.valid.validate.label');
        }

        if (!formValue['currency_id']) {
            errorss['currency_id'] = getFormattedMessage('bank-account.input.currency_id.validate.empty');
        }

        if (!formValue['country_id']) {
            errorss['country_id'] = getFormattedMessage('bank-account.input.country_id.validate.empty');
        }

        setErrors(errorss);
        return Object.keys(errorss).length == 0;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setFormValue(inputs => ({...inputs, [e.target.name]: e.target.value}));
        setErrors('');
    };
    const onCheckboxInput = (e) => {
        setFormValue(inputs => ({...inputs, [e.target.name]: e.target.checked ? 1 : 0}));
        setErrors('');
    };

    let disabled = false;

    const prepareFormData = (data) => {
        const formData = new FormData();
        for(let name in data){
            formData.append(name, ['account_type', 'currency_id', 'country_id'].includes(name) ? data[name].value : data[name]);
        }
        return formData;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleBankAccount && valid) {
            if (!disabled) {
                editBankAccount(singleBankAccount.id, prepareFormData(formValue), handleClose);
                clearField();
            }
        } else {
            if (valid) {
                setFormValue(formValue);
                addBankAccount(prepareFormData(formValue));
                clearField();
            }
        }
    };

    const clearField = () => {
        setFormValue({
            bank_name: '',
            account_holder_name: '',
            account_number: '',
            account_type: '',
            bank_branch: '',
            routing_number: '',
            currency_id: '',
            country_id: '',
            is_primary_account: '',
            note: '',
        })
        setErrors('');
        handleClose(false);
    };

    const onAccountTypeChange = (value) => {
        setFormValue((formValue) => ({
            ...formValue,
            account_type: value,
        }));
        setErrors({});
    };
    const onCurrencyChange = (value) => {
        setFormValue((formValue) => ({
            ...formValue,
            currency_id: value,
        }));
        setErrors({});
    };
    const onCountryChange = (value) => {
        setFormValue((formValue) => ({
            ...formValue,
            country_id: value,
        }));
        setErrors({});
    };

    return (
        <Modal show={show}
               onHide={clearField}
               keyboard={true}
               onShow={() => setTimeout(() => {
                //    innerRef.current.focus();
               }, 1)}
               dialogClassName='modal-lg'
        >
            <Form onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    onSubmit(e)
                }
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('bank-account.input.bank_name.label')}: </label>
                            <span className='required'/>
                            <input type='text' name='bank_name' autoComplete='off'
                                   placeholder={placeholderText('bank-account.placeholder.bank_name.label')}
                                   className='form-control' ref={innerRef} value={formValue.bank_name}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['bank_name'] ? errors['bank_name'] : null}
                                </span>
                        </div>
                        <div className='col-md-6 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('bank-account.input.account_holder_name.label')}: </label>
                            <span className='required'/>
                            <input type='text' name='account_holder_name' autoComplete='off'
                                   placeholder={placeholderText('bank-account.placeholder.account_holder_name.label')}
                                   className='form-control' ref={innerRef} value={formValue.account_holder_name}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['account_holder_name'] ? errors['account_holder_name'] : null}
                                </span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('bank-account.input.account_number.label')}: </label>
                            <span className='required'/>
                            <input type='text' name='account_number' autoComplete='off'
                                   placeholder={placeholderText('bank-account.placeholder.account_number.label')}
                                   className='form-control' ref={innerRef} value={formValue.account_number}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['account_number'] ? errors['account_number'] : null}
                                </span>
                        </div>
                        <div className='col-md-6 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "bank-account.input.account_type.label"
                                )}
                                placeholder={placeholderText(
                                    "bank-account.placeholder.account_type.label"
                                )}
                                defaultValue={
                                    formValue.account_type
                                }
                                value={
                                    formValue.account_type
                                }
                                data={accountTypes}
                                onChange={onAccountTypeChange}
                                errors={
                                    errors["account_type"]
                                }
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('bank-account.input.bank_branch.label')}: </label>
                            <span className='required'/>
                            <input type='text' name='bank_branch' autoComplete='off'
                                   placeholder={placeholderText('bank-account.placeholder.bank_branch.label')}
                                   className='form-control' ref={innerRef} value={formValue.bank_branch}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['bank_branch'] ? errors['bank_branch'] : null}
                                </span>
                        </div>
                        <div className='col-md-6 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('bank-account.input.routing_number.label')}: </label>
                            <span className='required'/>
                            <input type='text' name='routing_number' autoComplete='off'
                                   placeholder={placeholderText('bank-account.placeholder.routing_number.label')}
                                   className='form-control' ref={innerRef} value={formValue.routing_number}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['routing_number'] ? errors['routing_number'] : null}
                                </span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "bank-account.input.currency_id.label"
                                )}
                                placeholder={placeholderText(
                                    "bank-account.placeholder.currency_id.label"
                                )}
                                defaultValue={
                                    accountTypes[0].value
                                }
                                value={
                                    formValue.currency_id
                                }
                                data={bankAccountCurrencies ?? []}
                                onChange={onCurrencyChange}
                                errors={
                                    errors["currency_id"]
                                }
                            />
                        </div>
                        <div className='col-md-6 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "bank-account.input.country_id.label"
                                )}
                                placeholder={placeholderText(
                                    "bank-account.placeholder.country_id.label"
                                )}
                                defaultValue={
                                    accountTypes[0].value
                                }
                                value={
                                    formValue.country_id
                                }
                                data={bankAccountCountries ?? []}
                                onChange={onCountryChange}
                                errors={
                                    errors["country_id"]
                                }
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('bank-account.input.note.label')}: </label>
                            {/* <span className='required'/> */}
                            <textarea type='text' name='note' autoComplete='off'
                                   placeholder={placeholderText('bank-account.placeholder.note.label')}
                                   className='form-control' ref={innerRef}
                                   onChange={(e) => onChangeInput(e)} defaultValue={formValue.note}></textarea>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['note'] ? errors['note'] : null}
                                </span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className="form-check form-check-custom form-check-solid form-check-inline d-flex align-items-center cursor-pointer custom-label">
                                <input
                                    type="checkbox"
                                    name="is_primary_account"
                                    checked={formValue.is_primary_account == 1}
                                    onChange={(event) =>
                                        onCheckboxInput(event)
                                    }
                                    className="me-3 form-check-input cursor-pointer"
                                />
                                <div className="control__indicator" />{" "}
                                {getFormattedMessage(
                                    "bank-account.input.is_primary_account.label"
                                )}
                            </label>
                        </div>
                    </div>
                </Modal.Body>
            </Form>
            <ModelFooter onEditRecord={singleBankAccount} onSubmit={onSubmit} editDisabled={disabled}
                         clearField={clearField} />
        </Modal>
    )
};

export default connect(null, {fetchBankAccounts, addBankAccount, editBankAccount, fetchBankAccountFromData})(BankAccountForm);
