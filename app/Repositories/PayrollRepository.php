<?php

namespace App\Repositories;

use App\Models\Payroll;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class PayrollRepository
 */
class PayrollRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'basic_salary',
        'tax_identification_number',
        'payment_method',
        'benefits',
        'created_at',
        'first_name',
        'account_holder_name',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'employee_id',
        'basic_salary',
        'bank_account_id',
        'tax_identification_number',
        'payment_method',
        'benefits',
        'created_at',
        'first_name',
        'account_holder_name',
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
        return Payroll::class;
    }

    /**
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function storePayroll($input)
    {
        try {
            DB::beginTransaction();
            $payroll = $this->create($input);
            DB::commit();

            return $payroll;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function updatePayroll($input, $id)
    {
        try {
            DB::beginTransaction();
            $payroll = $this->update($input, $id);
            DB::commit();

            return $payroll;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}

