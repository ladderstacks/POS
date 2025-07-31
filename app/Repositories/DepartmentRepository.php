<?php

namespace App\Repositories;

use App\Models\Department;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class DepartmentRepository
 */
class DepartmentRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'description',
        'status',
        'created_at',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'name',
        'description',
        'status',
        'created_at',
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
        return Department::class;
    }

    /**
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function storeDepartment($input)
    {
        try {
            DB::beginTransaction();
            $department = $this->create($input);
            DB::commit();

            return $department;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function updateDepartment($input, $id)
    {
        try {
            DB::beginTransaction();
            $department = $this->update($input, $id);
            DB::commit();

            return $department;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}

