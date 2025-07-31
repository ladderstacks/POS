import React, {useState, createRef, useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {Form, Modal} from 'react-bootstrap-v5';
import { editDepartment, addDepartment, fetchDepartments, fetchDepartment } from "../../store/action/departmentActions";
import user from '../../assets/images/brand_logo.png';
import {getFormattedMessage} from '../../shared/sharedMethod';
import {placeholderText} from '../../shared/sharedMethod';
import ModelFooter from '../../shared/components/modelFooter';
import ReactSelect from '../../shared/select/reactSelect';
import apiConfig from '../../config/apiConfig'
import { apiBaseURL } from '../../constants';
import { addToast } from '../../store/action/toastAction';

const DepartmentForm = (props) => {
    const {handleClose, show, title, addDepartment, editDepartment, singleDepartment} = props;
    const innerRef = createRef();

    const statusTypes = [
        {
            label: "Active",
            value: 1,
        },
        {
            label: "Inactive",
            value: 0,
        }
    ]

    const [formValue, setFormValue] = useState({
        name: singleDepartment ? singleDepartment.name : '',
        description: singleDepartment ? singleDepartment.description : '',
        status: singleDepartment ? statusTypes.find(x => x.value == singleDepartment.status) : '',
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        status: '',
    });

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!formValue['name']) {
            errorss['name'] = getFormattedMessage('department.input.name.validate.empty');
        }

        if (!formValue['description'].trim()) {
            errorss['description'] = getFormattedMessage('department.input.description.validate.empty');
        }

        if (!formValue['status']) {
            errorss['status'] = getFormattedMessage('department.input.status.validate.empty');
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
            formData.append(name, ['status'].includes(name) ? data[name].value : data[name]);
        }
        return formData;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleDepartment && valid) {
            if (!disabled) {
                editDepartment(singleDepartment.id, prepareFormData(formValue), handleClose);
                clearField();
            }
        } else {
            if (valid) {
                setFormValue(formValue);
                addDepartment(prepareFormData(formValue));
                clearField();
            }
        }
    };

    const clearField = () => {
        setFormValue({
            name: '',
            description: '',
            status: '',
        })
        setErrors('');
        handleClose(false);
    };

    return (
        <Modal show={show}
               onHide={clearField}
               keyboard={true}
               onShow={() => setTimeout(() => {
                //    innerRef.current.focus();
               }, 1)}
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
                        <div className='col-md-12 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('department.input.name.label')}: </label>
                            <span className='required'/>
                            <input type='text' name='name' autoComplete='off'
                                   placeholder={placeholderText('department.placeholder.name.label')}
                                   className='form-control' ref={innerRef} value={formValue.name}
                                   onChange={(e) => onChangeInput(e)}/>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['name'] ? errors['name'] : null}
                                </span>
                        </div>
                        <div className='col-md-12 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('department.input.description.label')}: </label>
                            <span className='required'/>
                            <textarea type='text' name='description' autoComplete='off'
                                    placeholder={placeholderText('department.placeholder.description.label')}
                                    className='form-control'
                                    onChange={(e) => onChangeInput(e)} defaultValue={formValue.description}></textarea>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['description'] ? errors['description'] : null}
                                </span>
                        </div>
                        <div className='col-md-12 mb-5'>
                            <ReactSelect
                                title={getFormattedMessage(
                                    "department.input.status.label"
                                )}
                                placeholder={placeholderText(
                                    "department.placeholder.status.label"
                                )}
                                defaultValue={
                                    formValue.status
                                }
                                value={
                                    formValue.status
                                }
                                data={statusTypes ?? []}
                                onChange={status => setFormValue({...formValue, status: status})}
                                errors={
                                    errors["status"]
                                }
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Form>
            <ModelFooter onEditRecord={singleDepartment} onSubmit={onSubmit} editDisabled={disabled}
                         clearField={clearField} />
        </Modal>
    )
};

export default connect(null, {fetchDepartments, addDepartment, editDepartment})(DepartmentForm);
