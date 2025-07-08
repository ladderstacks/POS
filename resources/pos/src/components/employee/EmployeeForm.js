import React, { useState, createRef, useEffect } from 'react';
import { Form } from 'react-bootstrap-v5';
import { getFormattedMessage } from '../../shared/sharedMethod';
import { placeholderText } from '../../shared/sharedMethod';
import ReactDatePicker from '../../shared/datepicker/ReactDatePicker';
import ReactSelect from '../../shared/select/reactSelect';
import ModelFooter from '../../shared/components/modelFooter';
import moment from 'moment';

const EmployeeForm = (props) => {
    const { handleSubmit, employeeFormData, singleEmployee } = props;
    const [isloading, setIsloading] = useState(false);
    const innerRef = createRef();
    const [formValue, setFormValue] = useState({});

    useEffect(()=>{
        setFormValue({
            first_name: singleEmployee ? singleEmployee.first_name : '',
            middle_name: singleEmployee ? singleEmployee.middle_name : '',
            last_name: singleEmployee ? singleEmployee.last_name : '',
            date_of_birth: singleEmployee ? (new Date(singleEmployee.date_of_birth)).getTime() : '',
            gender: singleEmployee  && singleEmployee.gender ? {label: singleEmployee.gender, value: singleEmployee.gender} : '',
            nationality: singleEmployee ? singleEmployee.nationality : '',
            marital_status: singleEmployee && singleEmployee.marital_status ? {label: singleEmployee.marital_status, value: singleEmployee.marital_status}  : '',
            emirates_id: singleEmployee ? singleEmployee.emirates_id : '',
            passport_number: singleEmployee ? singleEmployee.passport_number : '',
            email: singleEmployee ? singleEmployee.email : '',
            phone_number: singleEmployee ? singleEmployee.phone_number : '',
            alternate_phone_number: singleEmployee ? singleEmployee.alternate_phone_number : '',
            emargency_contact_name: singleEmployee ? singleEmployee.emargency_contact_name : '',
            address: singleEmployee ? singleEmployee.address : '',
            country_id: singleEmployee && singleEmployee.country_id ? employeeFormData.countries.find(x => x.value == singleEmployee.country_id) : '',
            hire_date: singleEmployee ? (new Date(singleEmployee.hire_date)).getTime() : '',
            job_title: singleEmployee ? singleEmployee.job_title : '',
            department: singleEmployee ? singleEmployee.department : '',
            employment_type: singleEmployee && singleEmployee.employment_type ? {label:singleEmployee.employment_type, value: singleEmployee.employment_type} : '',
            reporting_manager_id: singleEmployee && singleEmployee.reporting_manager_id ? employeeFormData.employees.find(x => x.value == singleEmployee.reporting_manager_id) : '',
            employee_status: singleEmployee && singleEmployee.employee_status ? {label: singleEmployee.employee_status, value: singleEmployee.employee_status} : '',
            termination_date: singleEmployee && singleEmployee.termination_date ? (new Date(singleEmployee.termination_date)).getTime() : '',
            exit_reason: singleEmployee && singleEmployee.exit_reason ? singleEmployee.exit_reason : '',
        });
    }, [singleEmployee]);

    const genderTypes = [
        {
            label: "Male",
            value: "Male",
        },
        {
            label: "Female",
            value: "Female",
        },
        {
            label: "Other",
            value: "Other",
        },
    ];

    const maritalStatusTypes = [
        {
            label: "Married",
            value: "Married",
        },
        {
            label: "Unmarried",
            value: "Unmarried",
        },
    ];

    const emplomentTypes = [
        {
            label: "Full-time",
            value: "Full-time",
        },
        {
            label: "Part-time",
            value: "Part-time",
        },
        {
            label: "Contract",
            value: "Contract",
        },
    ];
    const employeeStatusTypes = [
        {
            label: "Active",
            value: "Active",
        },
        {
            label: "On Leave",
            value: "On Leave",
        },
        {
            label: "Terminated",
            value: "Terminated",
        },
    ];

    const [errors, setErrors] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        nationality: "",
        marital_status: "",
        emirates_id: "",
        passport_number: "",
        email: "",
        phone_number: "",
        alternate_phone_number: "",
        emargency_contact_name: "",
        address: "",
        country_id: "",
        hire_date: "",
        job_title: "",
        department: "",
        employment_type: "",
        reporting_manager_id: "",
        employee_status: "",
        termination_date: "",
        exit_reason: "",
    });

    const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!formValue['first_name'].trim()){
            errorss['first_name'] = getFormattedMessage('employee.validation.empty.first_name')
        }

        // if (!formValue['middle_name'].trim()){
        //     errorss['middle_name'] = getFormattedMessage('employee.validation.empty.middle_name')
        // }

        if (!formValue['last_name'].trim()){
            errorss['last_name'] = getFormattedMessage('employee.validation.empty.last_name')
        }
        if (!formValue['date_of_birth']){
            errorss['date_of_birth'] = getFormattedMessage('employee.validation.empty.date_of_birth')
        }
        if (!formValue['gender']){
            errorss['gender'] = getFormattedMessage('employee.validation.empty.gender')
        }
        if (!formValue['nationality'].trim()){
            errorss['nationality'] = getFormattedMessage('employee.validation.empty.nationality')
        }
        if (!formValue['marital_status']){
            errorss['marital_status'] = getFormattedMessage('employee.validation.empty.marital_status')
        }
        // if (!formValue['emirates_id'].trim()){
        //     errorss['emirates_id'] = getFormattedMessage('employee.validation.empty.emirates_id')
        // }
        // if (!formValue['passport_number'].trim()){
        //     errorss['passport_number'] = getFormattedMessage('employee.validation.empty.passport_number')
        // }
        if (!formValue['email'].trim()){
            errorss['email'] = getFormattedMessage('employee.validation.empty.email')
        }else if(!validateEmail(formValue['email'])){
            errorss['email'] = getFormattedMessage('employee.validation.invalid.email')
        }
        if (!formValue['phone_number'].trim()){
            errorss['phone_number'] = getFormattedMessage('employee.validation.empty.phone_number')
        }
        // if (!formValue['alternate_phone_number'].trim()){
        //     errorss['alternate_phone_number'] = getFormattedMessage('employee.validation.empty.alternate_phone_number')
        // }
        // if (!formValue['emargency_contact_name'].trim()){
        //     errorss['emargency_contact_name'] = getFormattedMessage('employee.validation.empty.emargency_contact_name')
        // }
        if (!formValue['address'].trim()){
            errorss['address'] = getFormattedMessage('employee.validation.empty.address')
        }
        if (!formValue['country_id']){
            errorss['country_id'] = getFormattedMessage('employee.validation.empty.country')
        }
        if (!formValue['hire_date']){
            errorss['hire_date'] = getFormattedMessage('employee.validation.empty.hire_date')
        }
        if (!formValue['job_title'].trim()){
            errorss['job_title'] = getFormattedMessage('employee.validation.empty.job_title')
        }
        if (!formValue['department'].trim()){
            errorss['department'] = getFormattedMessage('employee.validation.empty.department')
        }
        // if (!formValue['reporting_manager_id']){
        //     errorss['reporting_manager_id'] = getFormattedMessage('employee.validation.empty.reporting_manager')
        // }
        if (!formValue['employment_type']){
            errorss['employment_type'] = getFormattedMessage('employee.validation.empty.employment_type')
        }
        if (!formValue['employee_status']){
            errorss['employee_status'] = getFormattedMessage('employee.validation.empty.employee_status')
        }
        // if (!formValue['termination_date'].trim()){
        //     errorss['termination_date'] = getFormattedMessage('employee.validation.empty.termination_date')
        // }

        // if (!formValue['exit_reason'].trim()){
        //     errorss['exit_reason'] = getFormattedMessage('employee.validation.empty.exit_reason')
        // }
        setErrors(errorss);
        let errorKeys = Object.keys(errorss);
        if(errorKeys.length > 0){
            window.document.querySelector(`[name="${errorKeys[0]}"]`)?.scrollIntoView({behavior: 'smooth'});
        }
        return errorKeys.length == 0;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setFormValue(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
        setErrors('');
    };

    let disabled = false;

    const prepareFormData = (data) => {
        const formData = new FormData();
        window.kkkk = data;
        for (let name in data) {
            formData.append(name, ['gender', 'marital_status', 'reporting_manager_id', 'country_id', 'employment_type', 'employee_status'].includes(name) ? (data[name].value??'') : (data[name] instanceof Date || Number.isInteger(data[name]) ? moment(new Date(data[name])).format('YYYY-MM-DD') : (data[name] ?? '')));
        }
        return formData;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleEmployee && valid) {
            if (!disabled) {
                handleSubmit(prepareFormData(formValue), setIsloading);
            }
        } else {
            if (valid) {
                setFormValue(formValue);
                handleSubmit(prepareFormData(formValue), setIsloading);
            }
        }
    };

    const clearField = () => {
        setFormValue({
            first_name: '',
            middle_name: '',
            last_name: '',
            date_of_birth: '',
            gender: '',
            nationality: '',
            marital_status: '',
            emirates_id: '',
            passport_number: '',
            email: '',
            phone_number: '',
            alternate_phone_number: '',
            emargency_contact_name: '',
            address: '',
            country_id: '',
            hire_date: '',
            job_title: '',
            department: '',
            employment_type: '',
            reporting_manager: '',
            employee_status: '',
            termination_date: '',
            exit_reason: '',
        })
        setErrors('');
    };

    const dateOfBirthCallback = (date) => {
        setFormValue({...formValue, date_of_birth: date});
    }
    const hireDateCallback = (date) => {
        setFormValue({...formValue, hire_date: date});
    }
    const terminationDateCallback = (date, n) => {
        setFormValue({...formValue, termination_date: date});
    }

    return (
        <div className="card">
            <div className="card-body">
                <Form
                autoComplete="off"
                onSubmit={onSubmit}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit(e)
                    }
                }}>
                    <div className='row'>
                        <div className='col-12'>
                            <h3 className='mb-2'>{getFormattedMessage('employee.label.form.personal_information')}</h3>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.first_name')}: </label>
                            <span className='required' />
                            <input type='text' name='first_name' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.first_name')}
                                className='form-control' value={formValue.first_name}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['first_name'] ? errors['first_name'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.middle_name')}: </label>
                            <input type='text' name='middle_name' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.middle_name')}
                                className='form-control' value={formValue.middle_name}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['middle_name'] ? errors['middle_name'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.last_name')}: </label>
                            <span className='required' />
                            <input type='text' name='last_name' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.last_name')}
                                className='form-control' value={formValue.last_name}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['last_name'] ? errors['last_name'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label className='form-label'>
                                {getFormattedMessage( 'employee.label.date_of_birth' )}:
                            </label>
                            <span className='required' />
                            <div className='position-relative'>
                                <ReactDatePicker onChangeDate={dateOfBirthCallback} readOnlyref={false} selected={formValue.date_of_birth} placeholder={placeholderText('employee.placeholder.date_of_birth')} />
                            </div>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors[ 'date_of_birth' ] ? errors[ 'date_of_birth' ] : null}
                                </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "employee.label.gender"
                                )}
                                placeholder={placeholderText(
                                    "employee.placeholder.gender"
                                )}
                                defaultValue={
                                    genderTypes[0].value
                                }
                                value={
                                    formValue.gender
                                }
                                data={genderTypes ?? []}
                                onChange={selected => {setFormValue({...formValue, gender: selected})}}
                                errors={
                                    errors["gender"]
                                }
                            />
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.nationality')}: </label>
                            <span className='required' />
                            <input type='text' name='nationality' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.nationality')}
                                className='form-control' value={formValue.nationality}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['nationality'] ? errors['nationality'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "employee.label.marital_status"
                                )}
                                placeholder={placeholderText(
                                    "employee.placeholder.marital_status"
                                )}
                                defaultValue={
                                    maritalStatusTypes[0].value
                                }
                                value={
                                    formValue.marital_status
                                }
                                data={maritalStatusTypes ?? []}
                                onChange={selected => {setFormValue({...formValue, marital_status: selected})}}
                                errors={
                                    errors["marital_status"]
                                }
                            />
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.emirates_id')}: </label>
                            <input type='text' name='emirates_id' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.emirates_id')}
                                className='form-control' value={formValue.emirates_id}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['emirates_id'] ? errors['emirates_id'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.passport_number')}: </label>
                            <input type='text' name='passport_number' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.passport_number')}
                                className='form-control' value={formValue.passport_number}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['passport_number'] ? errors['passport_number'] : null}
                            </span>
                        </div>


                        <div className='col-12 border-top pt-4'>
                            <h3 className='mb-2'>{getFormattedMessage('employee.label.form.contact_information')}</h3>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.email')}: </label>
                                <span className='required' />
                            <input type='text' name='email' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.email')}
                                className='form-control' value={formValue.email}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['email'] ? errors['email'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.phone_number')}: </label>
                                <span className='required' />
                            <input type='text' name='phone_number' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.phone_number')}
                                className='form-control' value={formValue.phone_number}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['phone_number'] ? errors['phone_number'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.alternate_phone_number')}: </label>
                            <input type='text' name='alternate_phone_number' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.alternate_phone_number')}
                                className='form-control' value={formValue.alternate_phone_number}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['alternate_phone_number'] ? errors['alternate_phone_number'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.emargency_contact_name')}: </label>
                            <input type='text' name='emargency_contact_name' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.emargency_contact_name')}
                                className='form-control' value={formValue.emargency_contact_name}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['emargency_contact_name'] ? errors['emargency_contact_name'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.address')}: </label>
                                <span className='required' />
                            <input type='text' name='address' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.address')}
                                className='form-control' value={formValue.address}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['address'] ? errors['address'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "employee.label.country"
                                )}
                                placeholder={placeholderText(
                                    "employee.placeholder.country"
                                )}
                                defaultValue={
                                    formValue.country_id
                                }
                                value={
                                    formValue.country_id
                                }
                                data={employeeFormData?.countries ?? []}
                                onChange={selected => {setFormValue({...formValue, country_id: selected})}}
                                errors={
                                    errors["country_id"]
                                }
                            />
                        </div>

                        <div className='col-12 border-top pt-4'>
                            <h3 className='mb-2'>{getFormattedMessage('employee.label.form.employeement_details')}</h3>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label className='form-label'>
                                {getFormattedMessage( 'employee.label.hire_date' )}:
                            </label>
                            <span className='required' />
                            <div className='position-relative'>
                                <ReactDatePicker onChangeDate={hireDateCallback} readOnlyref={false} selected={formValue.hire_date} placeholder={placeholderText('employee.placeholder.hire_date')} />
                            </div>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors[ 'hire_date' ] ? errors[ 'hire_date' ] : null}
                                </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.job_title')}: </label>
                                <span className='required' />
                            <input type='text' name='job_title' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.job_title')}
                                className='form-control' value={formValue.job_title}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['job_title'] ? errors['job_title'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('employee.label.department')}: </label>
                                <span className='required' />
                            <input type='text' name='department' autoComplete='off'
                                placeholder={placeholderText('employee.placeholder.department')}
                                className='form-control' value={formValue.department}
                                onChange={(e) => onChangeInput(e)} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors['department'] ? errors['department'] : null}
                            </span>
                        </div>
                        <div className='col-md-4 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "employee.label.employment_type"
                                )}
                                placeholder={placeholderText(
                                    "employee.placeholder.employment_type"
                                )}
                                defaultValue={
                                    emplomentTypes[0].value
                                }
                                value={
                                    formValue.employment_type
                                }
                                data={emplomentTypes ?? []}
                                onChange={selected => {setFormValue({...formValue, employment_type: selected})}}
                                errors={
                                    errors["employment_type"]
                                }
                            />
                        </div>
                        <div className='col-md-4 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "employee.label.reporting_manager"
                                )}
                                placeholder={placeholderText(
                                    "employee.placeholder.reporting_manager"
                                )}
                                defaultValue={
                                    maritalStatusTypes[0].value
                                }
                                value={
                                    formValue.reporting_manager_id
                                }
                                data={employeeFormData?.employees ?? []}
                                onChange={selected => {setFormValue({...formValue, reporting_manager_id: selected})}}
                                errors={
                                    errors["reporting_manager_id"]
                                }
                                isRequired={'no'}

                            />
                        </div>
                        <div className='col-md-4 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "employee.label.employee_status"
                                )}
                                placeholder={placeholderText(
                                    "employee.placeholder.employee_status"
                                )}
                                defaultValue={
                                    maritalStatusTypes[0].value
                                }
                                value={
                                    formValue.employee_status
                                }
                                data={employeeStatusTypes ?? []}
                                onChange={selected => {setFormValue({...formValue, employee_status: selected})}}
                                errors={
                                    errors["employee_status"]
                                }

                            />
                        </div>
                        {(formValue.employee_status && formValue.employee_status?.value === 'Terminated') && <>
                            <div className='col-md-4 mb-5'>
                                <label className='form-label'>
                                    {getFormattedMessage( 'employee.label.termination_date' )}:
                                </label>
                                <div className='position-relative'>
                                    <ReactDatePicker onChangeDate={terminationDateCallback} readOnlyref={false} selected={formValue.termination_date} placeholder={placeholderText('employee.placeholder.termination_date')} />
                                </div>
                                <span className='text-danger d-block fw-400 fs-small mt-2'>
                                    {errors[ 'termination_date' ] ? errors[ 'termination_date' ] : null}
                                    </span>
                            </div>
                            <div className='col-md-12 mb-5'>
                                <label
                                    className='form-label'>{getFormattedMessage('employee.label.exit_reason')}: </label>
                                {/* <span className='required'/> */}
                                <textarea type='text' name='exit_reason' autoComplete='off'
                                        placeholder={placeholderText('employee.placeholder.exit_reason')}
                                        className='form-control' onChange={(e) => onChangeInput(e)} defaultValue={formValue.exit_reason}></textarea>
                                <span className='text-danger d-block fw-400 fs-small mt-2'>
                                            {errors['exit_reason'] ? errors['exit_reason'] : null}
                                    </span>
                            </div>
                        </>}
                    </div>
                    <div className="d-flex mt-5 justify-content-end">
                        <button className="btn btn-primary me-3" type="submit" disabled={isloading} >Save</button>
                        <a className="btn btn-secondary" href="#/app/employee">Cancel</a>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default EmployeeForm;
