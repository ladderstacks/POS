<?php

namespace App\Http\Controllers\API;

use App\Exports\EmployeesExport;
use App\Http\Controllers\AppBaseController;
use App\Http\Resources\EmployeeCollection;
use App\Http\Resources\EmployeeResource;
use App\Models\Country;
use App\Models\Employee;
use App\Repositories\EmployeeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeController extends AppBaseController
{

    private $employee_repository;

    public function __construct(EmployeeRepository $employee_repository)
    {
        $this->employee_repository = $employee_repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = getPageSize($request);

        $employees = $this->employee_repository->paginate($perPage);

        EmployeeResource::usingWithCollection();

        return new EmployeeCollection($employees);
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
        $request->validate(Employee::$rules);
        $employee = $this->employee_repository->storeEmployee($request->all());
        return new EmployeeResource($employee);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = Employee::findOrFail($id);
        return new EmployeeResource($employee);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $input = $request->all();
        $request->validate(Employee::$rules);
        $employee = $this->employee_repository->updateEmployee($input, $id);
        return new EmployeeResource($employee);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Employee::findOrFail($id)->delete();
        return $this->sendSuccess('Employee deleted successfully');
    }

    public function form_data(Request $request)
    {
        $countries = Country::all();
        $employees = $request->id ? Employee::where('id', '!=', $request->id)->get() : Employee::all();
        $form_data = [
            'countries' => [],
            'employees' => [
                [
                    'value' => '',
                    'label' => 'None',
                ]
            ],
        ];
        foreach($countries as $country){
            $form_data['countries'][] = [
                'value' => $country->id,
                'label' => $country->name,
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
        if (Storage::exists('excel/employee-excel-export.xlsx')) {
            Storage::delete('excel/employee-excel-export.xlsx');
        }
        Excel::store(new EmployeesExport, 'excel/employee-excel-export.xlsx');

        $data['employee_excel_url'] = Storage::url('excel/employee-excel-export.xlsx');

        return $this->sendResponse($data, 'Payroll retrieved successfully');
    }
}
