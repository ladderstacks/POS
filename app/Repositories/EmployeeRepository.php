<?php

namespace App\Repositories;

use App\Models\Employee;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BankAccountRepository
 */
class EmployeeRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'employee_id',
        'first_name',
        'last_name',
        'middle_name',
        'email',
        'phone_number',
        'job_title',
        'created_at',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'employee_id',
        'fisrt_name',
        'middle_name',
        'last_name',
        'date_of_birth',
        'nationality',
        'marital_status',
        'emirates_id',
        'passport_number',
        'gender',
        'email',
        'phone_number',
        'alternate_phone_number',
        'emergency_contact_name',
        'address',
        'country_id',
        'hire_date',
        'job_title',
        'department',
        'employment_type',
        'reporting_manager_id',
        'employee_status',
        'termination_date',
        'exit_reason',
    ];

    /**
     * Return searchable fields
     */
    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model(): string
    {
        return Employee::class;
    }

    /**
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function storeEmployee($input)
    {
        try {
            DB::beginTransaction();
            $input['middle_name'] = $input['middle_name'] ?? '';
            $input['employee_id'] = $input['employee_id'] ?? '';
            $employee = $this->create($input);
            $employee->update(['employee_id' => 'EM000'.$employee->id]);
            DB::commit();

            return $employee;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function updateEmployee($input, $id)
    {
        try {
            DB::beginTransaction();
            $employee = $this->update($input, $id);
            DB::commit();

            return $employee;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}

