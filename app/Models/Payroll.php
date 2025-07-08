<?php

namespace App\Models;

use App\Models\Contracts\JsonResourceful;
use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Payroll extends Model implements HasMedia, JsonResourceful
{
    use HasFactory, InteractsWithMedia, HasJsonResourcefulData;

    protected $table = 'payrolls';

    const JSON_API_TYPE = 'payrolls';

    protected $fillable = [
        'employee_id',
        'basic_salary',
        'bank_account_id',
        'tax_identification_number',
        'payment_method',
        'benefits',
    ];

    public const PATH = '';

    protected $appends = [];

    public static $rules = [
        'employee_id' => 'required|bail',
        'basic_salary' => 'required|bail',
        'bank_account_id' => 'required|bail',
        'tax_identification_number' => 'required|bail',
        'payment_method' => 'required|bail',
        'benefits' => 'required|bail',
    ];

    public function prepareLinks(): array
    {
        return [
            'self' => route('payroll.show', $this->id),
        ];
    }

    public function employee(){
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }

    public function bank_account(){
        return $this->belongsTo(BankAccount::class, 'bank_account_id', 'id');
    }

    public function prepareAttributes(): array
    {
        $fields = [
            'employee_id' => $this->employee_id,
            'employee_name' => $this->employee->full_name,
            'basic_salary' => $this->basic_salary,
            'bank_account_id' => $this->bank_account_id,
            'bank_account' => $this->bank_account->account_holder_name . " ~ " . $this->bank_account->bank_name,
            'tax_identification_number' => $this->tax_identification_number,
            'payment_method' => $this->payment_method,
            'benefits' => $this->benefits,
        ];

        return $fields;
    }

    public function preparePayroll(): array
    {
        $fields = [
            'employee_id' => $this->employee_id,
            'employee_name' => $this->employee->full_name,
            'basic_salary' => $this->basic_salary,
            'bank_account_id' => $this->bank_account_id,
            'bank_account' => $this->bank_account->bank_name,
            'tax_identification_number' => $this->tax_identification_number,
            'payment_method' => $this->payment_method,
            'benefits' => $this->benefits,
        ];

        return $fields;
    }
}
