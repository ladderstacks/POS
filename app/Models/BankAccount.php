<?php

namespace App\Models;

use App\Models\Contracts\JsonResourceful;
use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class BankAccount extends Model implements HasMedia, JsonResourceful
{
    use HasFactory, InteractsWithMedia, HasJsonResourcefulData;

    protected $table = 'bank_account_details';

    const JSON_API_TYPE = 'bank_account_details';

    protected $fillable = [
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

    public const PATH = '';

    protected $appends = [];

    public static $rules = [
        'bank_name' => 'required|bail',
        'account_holder_name' => 'required|bail',
        'account_number' => 'required|bail',
        'account_type' => 'required|bail',
        'bank_branch' => 'required|bail',
        'routing_number' => 'required|bail',
        'currency_id' => 'required|bail',
        'country_id' => 'required|bail',
        'is_primary_account' => 'nullable|string|bail',
        'note' => 'nullable|string|bail',
    ];

    public function prepareLinks(): array
    {
        return [
            'self' => route('bank-accounts.show', $this->id),
        ];
    }

    public function currency(){
        return $this->belongsTo(Currency::class, 'currency_id', 'id');
    }

    public function country(){
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }

    public function prepareAttributes(): array
    {
        $fields = [
            'bank_name' => $this->bank_name,
            'account_holder_name' => $this->account_holder_name,
            'account_number' => $this->account_number,
            'account_type' => $this->account_type,
            'bank_branch' => $this->bank_branch,
            'routing_number' => $this->routing_number,
            'currency_id' => $this->currency_id,
            'currency_name' => $this->currency->name,
            'country_id' => $this->country_id,
            'country_name' => $this->country->name,
            'is_primary_account' => $this->is_primary_account == 1,
            'note' => $this->note,

        ];

        return $fields;
    }

    public function prepareBankAccount(): array
    {
        $fields = [
            'id' => $this->id,
            'bank_name' => $this->bank_name,
            'account_holder_name' => $this->account_holder_name,
            'account_number' => $this->account_number,
            'account_type' => $this->account_type,
        ];

        return $fields;
    }
}
