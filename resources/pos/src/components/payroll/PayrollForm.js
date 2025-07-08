import React, {useState, createRef, useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {Form, Modal} from 'react-bootstrap-v5';
import { editPayroll, addPayroll, fetchPayrolls, fetchPayroll, fetchPayrollFromData } from '../../store/action/payrollActions';
import user from '../../assets/images/brand_logo.png';
import {getFormattedMessage} from '../../shared/sharedMethod';
import {placeholderText} from '../../shared/sharedMethod';
import ModelFooter from '../../shared/components/modelFooter';
import ReactSelect from '../../shared/select/reactSelect';
import apiConfig from '../../config/apiConfig'
import { apiBaseURL } from '../../constants';
import { addToast } from '../../store/action/toastAction';

const PayrollForm = (props) => {
    const {handleClose, show, title, addPayroll, editPayroll, singlePayroll, fetchPayrollFromData} = props;
    const innerRef = createRef();
    const payrollEmployees = useSelector(state => state.payrollEmployees)
    const payrollBankAccounts = useSelector(state => state.payrollBankAccounts)

    const paymentMethodTypes = [
        {
            value: 'Bank Transfer',
            label: 'Bank Transfer'
        },
        {
            value: 'Check',
            label: 'Check'
        }
    ]
    const benefitEnrollmentTypes = [
        {
            value: 'Health Insurance',
            label: 'Health Insurance'
        },
        {
            value: 'Retirement',
            label: 'Retirement'
        }
    ]

    const [formValue, setFormValue] = useState({
        employee_id: singlePayroll ? singlePayroll.employee_id : '',
        basic_salary: singlePayroll ? singlePayroll.basic_salary : '',
        bank_account_id: singlePayroll ? singlePayroll.bank_account_id : '',
        tax_identification_number: singlePayroll ? singlePayroll.tax_identification_number : '',
        payment_method: singlePayroll && singlePayroll.payment_method ?  paymentMethodTypes.find(x => x.value == singlePayroll.payment_method): '',
        benefits: singlePayroll && singlePayroll.benefits ? benefitEnrollmentTypes.find(x => x.value == singlePayroll.benefits) : '',
    });

    useEffect(()=> {
        fetchPayrollFromData();
        setFormValue({
            ...formValue,
            employee_id: (singlePayroll ? (singlePayroll.employee_id ? payrollEmployees.find(x => x.value == singlePayroll.employee_id) : '') : ''),
            bank_account_id: (singlePayroll ? (singlePayroll.bank_account_id ? payrollBankAccounts.find(x => x.value == singlePayroll.bank_account_id) : '') : ''),
        });
    }, [])

    const [errors, setErrors] = useState({
        employee_id: '',
        basic_salary: '',
        bank_account_id: '',
        tax_identification_number: '',
        payment_method: '',
        benefits: '',
    });

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!formValue['employee_id']) {
            errorss['employee_id'] = getFormattedMessage('payroll.input.employee.validate.empty');
        }

        if (!formValue['basic_salary'].trim()) {
            errorss['basic_salary'] = getFormattedMessage('payroll.input.basic_salary.validate.empty');
        }
        if (formValue['basic_salary'].trim() && !(/^\d+(\.\d{2})?$/.test(formValue['basic_salary'].trim()))) {
            errorss['basic_salary'] = getFormattedMessage('payroll.input.basic_salary.validate.invalid');
        }

        if (!formValue['bank_account_id']) {
            errorss['bank_account_id'] = getFormattedMessage('payroll.input.bank_account.validate.empty');
        }

        if (!formValue['tax_identification_number'].trim()) {
            errorss['tax_identification_number'] = getFormattedMessage('payroll.input.tax_identification_number.validate.empty');
        }

        if (!formValue['payment_method']) {
            errorss['payment_method'] = getFormattedMessage('payroll.input.payment_method.validate.empty');
        }

        if (!formValue['benefits']) {
            errorss['benefits'] = getFormattedMessage('payroll.input.benefits.validate.empty');
        }

        setErrors(errorss);
        return Object.keys(errorss).length == 0;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setFormValue(inputs => ({...inputs, [e.target.name]: e.target.value}));
        setErrors('');
    };

    let disabled = false;

    const prepareFormData = (data) => {
        const formData = new FormData();
        for(let name in data){
            formData.append(name, ['employee_id', 'bank_account_id', 'payment_method', 'benefits'].includes(name) ? (data[name].value ?? '') : data[name]);
        }
        return formData;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singlePayroll && valid) {
            if (!disabled) {
                editPayroll(singlePayroll.id, prepareFormData(formValue), handleClose);
                clearField();
            }
        } else {
            if (valid) {
                setFormValue(formValue);
                addPayroll(prepareFormData(formValue));
                clearField();
            }
        }
    };

    const clearField = () => {
        setFormValue({
            employee_id: '',
            basic_salary: '',
            bank_account_id: '',
            tax_identification_number: '',
            payment_method: '',
            benefits: '',
        })
        setErrors('');
        handleClose(false);
    };

    const employeeChange = (value) => {
        setFormValue((formValue) => ({
            ...formValue,
            employee_id: value,
        }));
        setErrors({});
    };
    const bankaccountChange = (value) => {
        setFormValue((formValue) => ({
            ...formValue,
            bank_account_id: value,
        }));
        setErrors({});
    };
    const benefitsChange = (value) => {
        setFormValue((formValue) => ({
            ...formValue,
            benefits: value,
        }));
        setErrors({});
    };
    const payemntmethodChange = (value) => {
        setFormValue((formValue) => ({
            ...formValue,
            payment_method: value,
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
                            <ReactSelect
                                title={getFormattedMessage(
                                    "payroll.input.employee.label"
                                )}
                                placeholder={placeholderText(
                                    "payroll.placeholder.employee.label"
                                )}
                                defaultValue={
                                    formValue.employee_id
                                }
                                value={
                                    formValue.employee_id
                                }
                                data={payrollEmployees ?? []}
                                onChange={employeeChange}
                                errors={
                                    errors["employee_id"]
                                }
                            />
                        </div>
                        <div className='col-md-6 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('payroll.input.basic_salary.label')}: </label>
                            <span className='required'/>
                            <input type='text' name='basic_salary' autoComplete='off'
                                   placeholder={placeholderText('payroll.placeholder.basic_salary.label')}
                                   className='form-control' ref={innerRef} value={formValue.basic_salary}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['basic_salary'] ? errors['basic_salary'] : null}
                                </span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "payroll.input.bank_account.label"
                                )}
                                placeholder={placeholderText(
                                    "payroll.placeholder.bank_account.label"
                                )}
                                defaultValue={
                                    formValue.bank_account_id
                                }
                                value={
                                    formValue.bank_account_id
                                }
                                data={payrollBankAccounts ?? []}
                                onChange={bankaccountChange}
                                errors={
                                    errors["bank_account_id"]
                                }
                            />
                        </div>
                        <div className='col-md-6 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('payroll.input.tax_identification_number.label')}: </label>
                            <span className='required'/>
                            <input type='text' name='tax_identification_number' autoComplete='off'
                                   placeholder={placeholderText('payroll.placeholder.tax_identification_number.label')}
                                   className='form-control' ref={innerRef} value={formValue.tax_identification_number}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['tax_identification_number'] ? errors['tax_identification_number'] : null}
                                </span>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "payroll.input.payment_method.label"
                                )}
                                placeholder={placeholderText(
                                    "payroll.placeholder.payment_method.label"
                                )}
                                defaultValue={
                                    formValue.payment_method
                                }
                                value={
                                    formValue.payment_method
                                }
                                data={paymentMethodTypes ?? []}
                                onChange={payemntmethodChange}
                                errors={
                                    errors["payment_method"]
                                }
                            />
                        </div>
                        <div className='col-md-6 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "payroll.input.benefits.label"
                                )}
                                placeholder={placeholderText(
                                    "payroll.placeholder.benefits.label"
                                )}
                                defaultValue={
                                    formValue.benefits
                                }
                                value={
                                    formValue.benefits
                                }
                                data={benefitEnrollmentTypes ?? []}
                                onChange={benefitsChange}
                                errors={
                                    errors["benefits"]
                                }
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Form>
            <ModelFooter onEditRecord={singlePayroll} onSubmit={onSubmit} editDisabled={disabled}
                         clearField={clearField} />
        </Modal>
    )
};

export default connect(null, {fetchPayrolls, addPayroll, editPayroll, fetchPayrollFromData})(PayrollForm);
