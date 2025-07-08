<?php

namespace App\Http\Controllers\API;

use App\Exports\BankAccountsExport;
use App\Http\Controllers\AppBaseController;
use App\Http\Resources\BankAccountCollection;
use App\Http\Resources\BankAccountResource;
use App\Models\BankAccount;
use App\Models\Country;
use App\Models\Currency;
use App\Repositories\BankAccountRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class BankAccountController extends AppBaseController
{
    private $bank_account_repository;

    public function __construct(BankAccountRepository $bank_account_repository)
    {
        $this->bank_account_repository = $bank_account_repository;
    }
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $perPage = getPageSize($request);

        $bankAccount = $this->bank_account_repository->paginate($perPage);

        BankAccountResource::usingWithCollection();

        return new BankAccountCollection($bankAccount);
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
        $request->validate(BankAccount::$rules);
        $bank_account = $this->bank_account_repository->storeBankAccount($request->all());
        return new BankAccountResource($bank_account);
    }

    /**
     * Display the specified resource.
     */
    public function show(BankAccount $bankAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $request->validate(BankAccount::$rules);
        $brand = $this->bank_account_repository->updateBankAccount($input, $id);

        return new BankAccountResource($brand);
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

        BankAccount::findOrFail($id)->delete();

        return $this->sendSuccess('Brand deleted successfully');
    }

    public function form_data()
    {
        $countries = Country::all();
        $currencies = Currency::all();
        $form_data = [];
        foreach($countries as $country){
            $form_data['countries'][] = [
                'value' => $country->id,
                'label' => $country->name,
            ];
        }
        foreach($currencies as $currency){
            $form_data['currencies'][] = [
                'value' => $currency->id,
                'label' => $currency->code,
            ];
        }
        return response()->json(['message' => '', 'data' => $form_data]);
    }

    public function excel()
    {
        if (Storage::exists('excel/bank-account-excel-export.xlsx')) {
            Storage::delete('excel/bank-account-excel-export.xlsx');
        }
        Excel::store(new BankAccountsExport, 'excel/bank-account-excel-export.xlsx');

        $data['bank_account_excel_url'] = Storage::url('excel/bank-account-excel-export.xlsx');

        return $this->sendResponse($data, 'BankAccount retrieved successfully');
    }
}
