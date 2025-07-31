<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Resources\DepartmentCollection;
use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Resources\DepartmentResource;
use App\Http\Resources\DepartmentsCollection;
use App\Http\Resources\DepartmentsResource;
use App\Repositories\DepartmentRepository;

class DepartmentController extends AppBaseController
{
    private $department_repository;

    public function __construct(DepartmentRepository $department_repository)
    {
        $this->department_repository = $department_repository;
    }

    public function index(Request $request)
    {
        $perPage = getPageSize($request);

        $department = $this->department_repository->paginate($perPage);

        DepartmentsResource::usingWithCollection();

        return new DepartmentsCollection($department);
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
        $request->validate(Department::$rules);
        $department = $this->department_repository->storeDepartment($request->all());
        return new DepartmentResource($department);
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $request->validate(Department::$rules);
        $brand = $this->department_repository->updateDepartment($input, $id);

        return new DepartmentResource($brand);
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

        Department::findOrFail($id)->delete();

        return $this->sendSuccess('Brand deleted successfully');
    }
}
