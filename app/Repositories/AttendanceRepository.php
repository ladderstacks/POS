<?php

namespace App\Repositories;

use App\Models\Attendance;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class AttendanceRepository
 */
class AttendanceRepository extends BaseRepository
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
        return Attendance::class;
    }

    /**
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function storeAttendance($input)
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
    public function updateAttendance($input, $id)
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

