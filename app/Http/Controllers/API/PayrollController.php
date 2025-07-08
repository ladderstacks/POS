<?php

namespace App\Http\Controllers\API;

use App\Exports\PayrollsExport;
use App\Http\Controllers\AppBaseController;
use App\Http\Resources\PayrollCollection;
use App\Http\Resources\PayrollResource;
use App\Models\BankAccount;
use App\Models\Payroll;
use App\Models\Country;
use App\Models\Currency;
use App\Models\Employee;
use App\Repositories\PayrollRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class PayrollController extends AppBaseController
{
    private $payroll_repository;

    public function __construct(PayrollRepository $payroll_repository)
    {
        $this->payroll_repository = $payroll_repository;
    }
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $perPage = $request->input('page.size', getPageSize($request));
        $search = $request->input('filter.search');
        $sort = $request->input('sort');

        $query = Payroll::with(['employee', 'bank_account']);

        // Filter logic
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('employee', function ($q2) use ($search) {
                    $q2->where('first_name', 'like', "%{$search}%");
                })
                ->orWhere('basic_salary', 'like', "%{$search}%")
                ->orWhereHas('bank_account', function ($q3) use ($search) {
                    $q3->where('account_holder_name', 'like', "%{$search}%");
                });
            });
        }

        // Sorting logic
        if ($sort) {
            $direction = 'asc';
            if (str_starts_with($sort, '-')) {
                $direction = 'desc';
                $sort = ltrim($sort, '-');
            }

            if (in_array($sort, ['basic_salary', 'created_at'])) {
                // Direct column in payrolls table
                $query->orderBy("payrolls.$sort", $direction);
            } elseif ($sort === 'first_name') {
                // Sort by related employee's first name
                $query->join('employees', 'payrolls.employee_id', '=', 'employees.id')
                    ->orderBy('employees.first_name', $direction)
                    ->select('payrolls.*'); // prevent column ambiguity
            } elseif ($sort === 'account_holder_name') {
                // Sort by related bank account's holder name
                $query->join('bank_account_details', 'payrolls.bank_account_id', '=', 'bank_account_details.id')
                    ->orderBy('bank_account_details.account_holder_name', $direction)
                    ->select('payrolls.*');
            }
        }

        $payrolls = $query->select('payrolls.*')->paginate($perPage);

        PayrollResource::usingWithCollection();

        return new PayrollCollection($payrolls);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(Payroll::$rules);
        $payroll = $this->payroll_repository->storePayroll($request->all());
        return new PayrollResource($payroll);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payroll $bankAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $request->validate(Payroll::$rules);
        $brand = $this->payroll_repository->updatePayroll($input, $id);

        return new PayrollResource($brand);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // $productModels = [
        //     Product::class,
        // ];
        // $productResult = canDelete($productModels, 'brand_id', $id);

        // if ($productResult) {
        //     return $this->sendError('Brand can\'t be deleted.');
        // }

        Payroll::findOrFail($id)->delete();

        return $this->sendSuccess('Brand deleted successfully');
    }

    public function form_data()
    {
        $bankaccounts = BankAccount::all();
        $employees = Employee::all();
        $form_data = [];
        foreach($bankaccounts as $bankaccount){
            $form_data['bank_accounts'][] = [
                'value' => $bankaccount->id,
                'label' => $bankaccount->account_holder_name . " ~ " . $bankaccount->bank_name,
            ];
        }
        foreach($employees as $employee){
            $form_data['employees'][] = [
                'value' => $employee->id,
                'label' => $employee->full_name,
            ];
        }
        return response()->json(['message' => '', 'data' => $form_data]);
    }

    public function excel()
    {
        if (Storage::exists('excel/payroll-excel-export.xlsx')) {
            Storage::delete('excel/payroll-excel-export.xlsx');
        }
        Excel::store(new PayrollsExport, 'excel/payroll-excel-export.xlsx');

        $data['payroll_excel_url'] = Storage::url('excel/payroll-excel-export.xlsx');

        return $this->sendResponse($data, 'Payroll retrieved successfully');
    }
}
