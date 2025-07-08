import React, {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import { editEmployee, fetchEmployee } from '../../store/action/employeeActions';
import EmployeeForm from './EmployeeForm';
import HeaderTitle from '../header/HeaderTitle';
import {getFormattedMessage} from '../../shared/sharedMethod';
import { fetchEmployeeFromData } from '../../store/action/employeeActions';

const EditEmployee = (props) => {
    const {editEmployee, fetchEmployee, fetchEmployeeFromData} = props;
    const employeeFormData = useSelector(state => state.employeesFormData);
    const employee = useSelector(state => state.employees);
    const [singleEmployee, setSingleEmployee] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployeeFromData(id);
        fetchEmployee(id);
    }, []);

    useEffect(()=>{
        setSingleEmployee(employee.attributes);
    }, [employee]);

    const editEmployeeData = (formValue, setIsloading) => {
        editEmployee(id, formValue, navigate, setIsloading);
    };

    return (
        <MasterLayout>
            <HeaderTitle title={getFormattedMessage('employee.edit.title')} to='/app/employee'/>
            <EmployeeForm handleSubmit={editEmployeeData} employeeFormData={employeeFormData} singleEmployee={singleEmployee} />
        </MasterLayout>
    )
};

export default connect(null, {editEmployee, fetchEmployee, fetchEmployeeFromData})(EditEmployee);
