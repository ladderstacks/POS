<?php

namespace App\Exports;

use App\Models\Payroll;
use Maatwebsite\Excel\Concerns\FromView;

class PayrollsExport implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): \Illuminate\Contracts\View\View
    {
        return view('excel.payroll-excel-export', ['payrolls' => Payroll::with(['employee', 'bank_account'])->get()]);
    }
}
