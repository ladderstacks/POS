<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "//www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Bank Accounts Excel Export</title>
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
        <th style="width: 200%">{{ __('messages.pdf.bank_name') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.account_holder_name') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.account_number') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.account_type') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.bank_branch') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.routing_number') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.currency') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.country') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.note') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.is_primary_account') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.created_on') }}</th>
    </tr>
    </thead>
    <tbody>
    @foreach($bank_accounts  as $bank_account)
        <tr align="center">
            <td>{{$bank_account->bank_name}}</td>
            <td>{{$bank_account->account_holder_name}}</td>
            <td>{{$bank_account->account_number}}</td>
            <td>{{$bank_account->account_type}}</td>
            <td>{{$bank_account->bank_branch}}</td>
            <td>{{$bank_account->routing_number}}</td>
            <td>{{$bank_account->currency->code}}</td>
            <td>{{$bank_account->country->name}}</td>
            <td>{{$bank_account->note}}</td>
            <td>{{$bank_account->is_primary_account == 1 ? "✅": ""}}</td>
            <td>{{ \Carbon\Carbon::parse($bank_account->created_at)->isoFormat('Do MMM, YYYY')}}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
