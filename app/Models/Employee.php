<?php

namespace App\Models;

use App\Models\Contracts\JsonResourceful;
use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Employee extends Model implements HasMedia, JsonResourceful
{
    use HasFactory, InteractsWithMedia, HasJsonResourcefulData;

    protected $table = 'employees';

    const JSON_API_TYPE = 'employees';

    protected $fillable = [
        'employee_id',
        'first_name',
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

    public const PATH = '';

    protected $appends = ['full_name'];

    public function getFullNameAttribute()
    {
        return $this->first_name. ' ' . $this->middle_name . ' '. $this->last_name;
    }

    public static $rules = [
        'first_name' => 'required|bail',
        'middle_name' => 'nullable|bail',
        'last_name' => 'required|bail',
        'date_of_birth' => 'required|bail',
        'nationality' => 'required|bail',
        'marital_status' => 'required|bail',
        'emirates_id' => 'nullable|bail',
        'passport_number' => 'nullable|bail',
        'gender' => 'required|bail',
        'email' => 'required|email|bail',
        'phone_number' => 'required|bail',
        'alternate_phone_number' => 'nullable|bail',
        'emergency_contact_name' => 'nullable|bail',
        'address' => 'required|bail',
        'country_id' => 'required|bail',
        'hire_date' => 'required|bail',
        'job_title' => 'required|bail',
        'department' => 'required|bail',
        'employment_type' => 'required|bail',
        'reporting_manager_id' => 'nullable|bail',
        'employee_status' => 'required|bail',
        'termination_date' => 'nullable|bail',
        'exit_reason' => 'nullable|bail',
    ];

    public function prepareLinks(): array
    {
        return [
            'self' => route('employee.show', $this->id),
        ];
    }

    public function country(){
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }

    public function reporting_manager(){
        return $this->belongsTo(Employee::class, 'reporting_manager_id', 'id');
    }

    public function prepareAttributes(): array
    {
        $fields = [
            'employee_id' => $this->employee_id,
            'full_name' => $this->getFullNameAttribute(),
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'date_of_birth' => $this->date_of_birth,
            'nationality' => $this->nationality,
            'marital_status' => $this->marital_status,
            'emirates_id' => $this->emirates_id,
            'passport_number' => $this->passport_number,
            'gender' => $this->gender,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'alternate_phone_number' => $this->alternate_phone_number,
            'emergency_contact_name' => $this->emergency_contact_name,
            'address' => $this->address,
            'country_id' => $this->country_id,
            'country_name' => $this->country->name,
            'hire_date' => $this->hire_date,
            'job_title' => $this->job_title,
            'department' => $this->department,
            'employment_type' => $this->employment_type,
            'reporting_manager_id' => $this->reporting_manager_id,
            'reporting_manager_name' => $this->reporting_manager?->full_name ?? '',
            'employee_status' => $this->employee_status,
            'termination_date' => $this->termination_date,
            'exit_reason' => $this->exit_reason,
        ];

        return $fields;
    }

    public function prepareEmployee(): array
    {
        $fields = [
            'id' => $this->id,
            'full_name' => $this->first_name. '' . $this->middle_name . ' '. $this->last_name,
            'employee_id' => $this->employee_id,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'job_title' => $this->job_title,
        ];

        return $fields;
    }
}
