import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import { addEmployee } from '../../store/action/employeeActions';
import EmployeeForm from './EmployeeForm';
import HeaderTitle from '../header/HeaderTitle';
import {getFormattedMessage} from '../../shared/sharedMethod';
import { fetchEmployeeFromData } from '../../store/action/employeeActions';

const CreateEmployee = (props) => {
    const {addEmployee,fetchEmployeeFromData} = props;
    const navigate = useNavigate();
    const employeeFormData = useSelector(state => state.employeesFormData);

    useEffect(() => {
        fetchEmployeeFromData();
    }, []);

    const addEmployeeData = (formValue, setIsloading) => {
        addEmployee(formValue, navigate, setIsloading);
    };

    return (
        <MasterLayout>
            <HeaderTitle title={getFormattedMessage('employee.create.title')} to='/app/employee'/>
            <EmployeeForm handleSubmit={addEmployeeData} employeeFormData={employeeFormData} />
        </MasterLayout>
    )
};

export default connect(null, {addEmployee, fetchEmployeeFromData})(CreateEmployee);
