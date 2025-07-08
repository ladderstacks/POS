<?php

namespace App\Repositories;

use App\Models\BankAccount;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BankAccountRepository
 */
class BankAccountRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'bank_name',
        'account_holder_name',
        'account_number',
        'bank_branch',
        'created_at',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'bank_name',
        'account_holder_name',
        'account_number',
        'account_type',
        'bank_branch',
        'routing_number',
        'currency_id',
        'country_id',
        'is_primary_account',
        'note',
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
        return BankAccount::class;
    }

    /**
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function storeBankAccount($input)
    {
        try {
            DB::beginTransaction();
            $input['note'] = $input['note'] ?? '';
            $input['is_primary_account'] = boolval($input['is_primary_account']);
            $bankAccount = $this->create($input);
            DB::commit();

            return $bankAccount;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function updateBankAccount($input, $id)
    {
        try {
            DB::beginTransaction();
            $bankAccount = $this->update($input, $id);
            DB::commit();

            return $bankAccount;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}

