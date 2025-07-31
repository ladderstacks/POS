import React, {useState, createRef, useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {Form, Modal} from 'react-bootstrap-v5';
import { editAttendance, addAttendance, fetchAttendances, fetchAttendance, fetchAttendanceFromData } from "../../store/action/attendanceActions";
import user from '../../assets/images/brand_logo.png';
import {getFormattedMessage} from '../../shared/sharedMethod';
import {placeholderText} from '../../shared/sharedMethod';
import ModelFooter from '../../shared/components/modelFooter';
import ReactSelect from '../../shared/select/reactSelect';
import apiConfig from '../../config/apiConfig'
import { apiBaseURL } from '../../constants';
import { addToast } from '../../store/action/toastAction';
import ReactDatePicker from '../../shared/datepicker/ReactDatePicker';
import moment from 'moment';

const AttendanceForm = (props) => {
    const {handleClose, show, title, addAttendance, editAttendance, fetchAttendanceFromData, singleAttendance, attendanceFormData} = props;
    const innerRef = createRef();
    useEffect(()=>{
        fetchAttendanceFromData();
    },[]);

    const [formValue, setFormValue] = useState({
        employee_id: singleAttendance && singleAttendance.employee_id ? {value: singleAttendance.employee_id, label: singleAttendance.employee_name} : '',
        date: singleAttendance && singleAttendance.date ? new Date(singleAttendance.date).getTime() : (new Date()).getTime(),
        clock_in: singleAttendance ? singleAttendance.clock_in : '',
        clock_in_hh: singleAttendance ? singleAttendance.clock_in.split(':')[0] : '',
        clock_in_mm: singleAttendance ? singleAttendance.clock_in.split(':')[1] : '',
        clock_out: singleAttendance ? singleAttendance.clock_out : '',
        clock_out_hh: singleAttendance ? singleAttendance.clock_out.split(':')[0] : '',
        clock_out_mm: singleAttendance ? singleAttendance.clock_out.split(':')[1] : '',
    });

    const [errors, setErrors] = useState({
        employee_id: '',
        date: '',
        clock_in: '',
        clock_in_hh: '',
        clock_in_mm: '',
        clock_out: '',
        clock_out_hh: '',
        clock_out_mm: '',
    });

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!formValue['employee_id']) {
            errorss['employee_id'] = getFormattedMessage('attendance.input.employee_id.validate.empty');
        }

        if (!formValue['date']) {
            errorss['date'] = getFormattedMessage('attendance.input.date.validate.empty');
        }

        if (!formValue['clock_in_hh']) {
            errorss['clock_in_hh'] = getFormattedMessage('attendance.input.clock_in_hh.validate.empty');
        }
        if (!formValue['clock_in_mm']) {
            errorss['clock_in_mm'] = getFormattedMessage('attendance.input.clock_in_mm.validate.empty');
        }
        if (!formValue['clock_out_hh']) {
            errorss['clock_out_hh'] = getFormattedMessage('attendance.input.clock_out_hh.validate.empty');
        }
        if (!formValue['clock_out_mm']) {
            errorss['clock_out_mm'] = getFormattedMessage('attendance.input.clock_out_mm.validate.empty');
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
            formData.append(name, ['employee_id'].includes(name) ? (data[name].value??'') : (data[name] instanceof Date || Number.isInteger(data[name]) ? moment(new Date(data[name])).format('YYYY-MM-DD') : (data[name] ?? '')));
        }
        if(formValue.clock_in_hh && formValue.clock_in_mm){
            formData.append('clock_in', `${formValue.clock_in_hh}:${formValue.clock_in_mm}:00`)
        }
        if(formValue.clock_out_hh && formValue.clock_out_mm){
            formData.append('clock_out', `${formValue.clock_out_hh}:${formValue.clock_out_mm}:00`)
        }
        return formData;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleAttendance && valid) {
            if (!disabled) {
                editAttendance(singleAttendance.id, prepareFormData(formValue), handleClose);
                clearField();
            }
        } else {
            if (valid) {
                setFormValue(formValue);
                addAttendance(prepareFormData(formValue));
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

    const dateCallback = (date) => {
        setFormValue({...formValue, date: date});
    }

    const HourOption = (props) => {
        const selected_value = props.selected_value ?? "";
        const hours = [];
        for (let hour = 0; hour < 24; hour++) {
            hours.push({label: hour.toString().padStart(2, '0'), value: hour.toString().padStart(2, '0')});
        }
        return (
            <select {...props} defaultValue={selected_value}>
                <option value="" disabled={true}>HH</option>
                {
                    hours.map((option, index) => {
                        return <option key={index} value={option.value}>{option.label}</option>
                    })
                }
            </select>
        );
    }
    const MinuteOption = (props) => {
        const selected_value = props.selected_value ?? "";
        const minutes = [];
        for (let minute = 0; minute < 60; minute++) {
            minutes.push({label: minute.toString().padStart(2, '0'), value: minute.toString().padStart(2, '0')});
        }
        return (
            <select {...props} defaultValue={selected_value}>
                <option value="" disabled={true}>MM</option>
                {
                    minutes.map((option, index) => {
                        return <option key={index} value={option.value}>{option.label}</option>
                    })
                }
            </select>
        );
    }

    return (
        <Modal show={show}
               onHide={clearField}
               keyboard={true}
               onShow={() => setTimeout(() => {
                   innerRef.current.focus();
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
                            <ReactSelect
                                title={getFormattedMessage(
                                    "attendance.input.employee.label"
                                )}
                                placeholder={placeholderText(
                                    "attendance.placeholder.employee.label"
                                )}
                                defaultValue={
                                    formValue.employee_id
                                }
                                value={
                                    formValue.employee_id
                                }
                                data={attendanceFormData.employees ?? []}
                                onChange={employee_id => setFormValue({...formValue, employee_id: employee_id})}
                                errors={
                                    errors["employee_id"]
                                }
                            />
                        </div>
                        <div className='col-md-12 mb-5'>
                            <label className='form-label'>
                                {getFormattedMessage( 'attendance.label.date' )}:
                            </label>
                            <span className='required' />
                            <div className='position-relative'>
                                <ReactDatePicker onChangeDate={dateCallback} readOnlyref={false} selected={formValue.date} placeholder={placeholderText('attendance.placeholder.date')} />
                            </div>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                {errors[ 'date' ] ? errors[ 'date' ] : null}
                                </span>
                        </div>
                        <div className='col-md-12 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage('attendance.input.clock_in.label')}: </label>
                            <span className='required'/>
                            <div className='d-flex gap-3 align-items-center'>
                                <HourOption selected_value={formValue.clock_in_hh} className="form-control w-25" onChange={e => setFormValue({...formValue, clock_in_hh: e.target.value})}></HourOption>
                                <strong>:</strong>
                                <MinuteOption selected_value={formValue.clock_in_mm} className="form-control w-25" onChange={e => setFormValue({...formValue, clock_in_mm: e.target.value})}></MinuteOption>
                            </div>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['clock_in_hh'] ? errors['clock_in_hh'] : null}
                                </span>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['clock_in_mm'] ? errors['clock_in_mm'] : null}
                                </span>
                        </div>
                        <div className='col-md-12'>
                            <label
                                className='form-label'>{getFormattedMessage('attendance.input.clock_out.label')}: </label>
                            <span className='required'/>
                            <div className='d-flex gap-3 align-items-center'>
                                <HourOption selected_value={formValue.clock_out_hh} className="form-control w-25" onChange={e => setFormValue({...formValue, clock_out_hh: e.target.value})}></HourOption>
                                <strong>:</strong>
                                <MinuteOption selected_value={formValue.clock_out_mm} className="form-control w-25" onChange={e => setFormValue({...formValue, clock_out_mm: e.target.value})}></MinuteOption>
                            </div>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['clock_out_hh'] ? errors['clock_out_hh'] : null}
                                </span>
                            <span className='text-danger d-block fw-400 fs-small mt-2'>
                                        {errors['clock_out_mm'] ? errors['clock_out_mm'] : null}
                                </span>
                        </div>
                    </div>
                </Modal.Body>
            </Form>
            <ModelFooter onEditRecord={singleAttendance} onSubmit={onSubmit} editDisabled={disabled}
                         clearField={clearField} />
        </Modal>
    )
};
const mapStateToProps = (state) => {
    const {attendanceFormData} = state;
    return {attendanceFormData};
}

export default connect(mapStateToProps, {fetchAttendances, addAttendance, editAttendance, fetchAttendanceFromData})(AttendanceForm);
