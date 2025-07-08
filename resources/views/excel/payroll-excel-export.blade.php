<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "//www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Payrolls Excel Export</title>
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
        <th style="width: 200%">{{ __('messages.pdf.employee_name') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.basic_salary') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.bank_account') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.tax_identification_number') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.payment_method') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.benefits') }}</th>
    </tr>
    </thead>
    <tbody>
    @foreach($payrolls  as $payroll)
        <tr align="center">
            <td>{{$payroll->employee->full_name}}</td>
            <td>{{$payroll->basic_salary}}</td>
            <td>{{$payroll->bank_account->account_holder_name . " ~ " . $payroll->bank_account->bank_name}}</td>
            <td>{{$payroll->tax_identification_number}}</td>
            <td>{{$payroll->payment_method}}</td>
            <td>{{$payroll->benefits}}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
