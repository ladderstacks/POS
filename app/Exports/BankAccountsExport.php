<?php

namespace App\Exports;

use App\Models\BankAccount;
use Maatwebsite\Excel\Concerns\FromView;

class BankAccountsExport implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): \Illuminate\Contracts\View\View
    {
        return view('excel.bank-account-excel-export', ['bank_accounts' => BankAccount::all()]);
    }
}
