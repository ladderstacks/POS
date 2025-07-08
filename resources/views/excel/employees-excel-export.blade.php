<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "//www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Employees Excel Export</title>
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon.ico') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <!-- General CSS Files -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
</head>
<body>
<table width="100%" cellspacing="0" cellpadding="10" style="margin-top: 40px;">
    <thead>
    <tr style="background-color: dodgerblue;">
        <th style="width: 200%">{{ __('messages.pdf.employee_id') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.first_name') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.middle_name') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.last_name') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.date_of_birth') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.gender') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.nationality') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.marital_status') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.emirates_id') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.passport_number') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.email') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.phone_number') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.alternate_phone_number') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.emargency_contact_name') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.address') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.country') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.hire_date') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.job_title') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.department') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.employment_type') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.reporting_manager') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.employee_status') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.termination_date') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.exit_reason') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.created_on') }}</th>
    </tr>
    </thead>
    <tbody>
    @foreach($employees  as $employee)
        <tr align="center">
            <td>{{$employee->employee_id}}</td>
            <td>{{$employee->first_name}}</td>
            <td>{{$employee->middle_name}}</td>
            <td>{{$employee->last_name}}</td>
            <td>{{$employee->date_of_birth}}</td>
            <td>{{$employee->gender}}</td>
            <td>{{$employee->nationality}}</td>
            <td>{{$employee->marital_status}}</td>
            <td>{{$employee->emirates_id}}</td>
            <td>{{$employee->passport_number}}</td>
            <td>{{$employee->email}}</td>
            <td>{{$employee->phone_number}}</td>
            <td>{{$employee->alternate_phone_number}}</td>
            <td>{{$employee->emargency_contact_name}}</td>
            <td>{{$employee->address}}</td>
            <td>{{$employee->country->name}}</td>
            <td>{{$employee->hire_date}}</td>
            <td>{{$employee->job_title}}</td>
            <td>{{$employee->department}}</td>
            <td>{{$employee->employment_type}}</td>
            <td>{{$employee->reporting_manager}}</td>
            <td>{{$employee->employee_status}}</td>
            <td>{{$employee->termination_date}}</td>
            <td>{{$employee->exit_reason}}</td>
            <td>{{ \Carbon\Carbon::parse($employee->created_at )->isoFormat('Do MMM, YYYY')}}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
