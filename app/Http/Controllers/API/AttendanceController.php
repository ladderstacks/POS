<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Resources\AttendanceCollection;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Http\Resources\AttendanceResource;
use App\Http\Resources\AttendancesCollection;
use App\Http\Resources\AttendancesResource;
use App\Models\Employee;
use App\Repositories\AttendanceRepository;
use Illuminate\Support\Facades\DB;

class AttendanceController extends AppBaseController
{
    private $attendance_repository;

    public function __construct(AttendanceRepository $attendance_repository)
    {
        $this->attendance_repository = $attendance_repository;
    }

    public function index(Request $request)
    {
        $perPage = $request->input('page.size', getPageSize($request));
        $search = $request->input('filter.search');
        $sort = $request->input('sort');

        $query = Attendance::with(['employee']);

        // Filter logic
        if ($search) {
            $query->where(function ($q) use ($search) {
                $date_format = str_replace(['y', 'm', 'd'], ['%Y', '%m', '%d'], (getSettingValue('date_format') ?? '%Y-%m-%d'));
                $q->whereHas('employee', function ($q2) use ($search) {
                    $q2->where(DB::raw('CONCAT(first_name, " ", last_name)'), 'like', "%{$search}%")
                    ;
                })
                ->orWhere(DB::raw("DATE_FORMAT(date, '$date_format')"), 'like', "%{$search}%")
                ;
            });
        }

        // Sorting logic
        if ($sort) {
            $direction = 'asc';
            if (str_starts_with($sort, '-')) {
                $direction = 'desc';
                $sort = ltrim($sort, '-');
            }

            if (in_array($sort, ['date', 'created_at'])) {
                // Direct column in attendance table
                $query->orderBy("attendance.$sort", $direction);
            } elseif ($sort === 'name') {
                // Sort by related employee's first name
                $query->join('employees', 'attendance.employee_id', '=', 'employees.id')
                    ->orderBy('employees.first_name', $direction)
                    ->orderBy('employees.last_name', $direction)
                    ->select('attendance.*'); // prevent column ambiguity
            }
        }

        $attendances = $query->select('attendance.*')->paginate($perPage);

        AttendancesResource::usingWithCollection();

        return new AttendancesCollection($attendances);
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
        $request->validate(Attendance::$rules);
        $attendance = $this->attendance_repository->storeAttendance($request->all());
        return new AttendancesResource($attendance);
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $request->validate(Attendance::$rules);
        $brand = $this->attendance_repository->updateAttendance($input, $id);

        return new AttendancesResource($brand);
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

        Attendance::findOrFail($id)->delete();

        return $this->sendSuccess('Brand deleted successfully');
    }

    public function form_data()
    {
        $employees = Employee::all();
        $form_data = [
            'employees' => []
        ];
        foreach($employees as $employee){
            $form_data['employees'][] = [
                'value' => $employee->id,
                'label' => $employee->full_name,
            ];
        }
        return response()->json(['message' => '', 'data' => $form_data]);
    }
}
