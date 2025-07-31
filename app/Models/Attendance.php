<?php

namespace App\Models;

use App\Models\Contracts\JsonResourceful;
use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Attendance extends Model implements HasMedia, JsonResourceful
{
    use HasFactory, InteractsWithMedia, HasJsonResourcefulData;

    protected $table = 'attendance';

    const JSON_API_TYPE = 'attendance';

    protected $fillable = [
        'employee_id',
        'date',
        'clock_in',
        'clock_out',
    ];

    public const PATH = '';

    protected $appends = [];

    public static $rules = [
        'employee_id' => 'required|bail',
        'date' => 'required|bail',
        'clock_in' => 'required|bail',
        'clock_out' => 'required|bail',
    ];

    public function prepareLinks(): array
    {
        return [
            'self' => route('attendances.show', $this->id),
        ];
    }

    public function prepareAttributes(): array
    {
        $fields = [
            'employee_id' => $this->employee_id,
            'employee_name' => $this->employee->full_name,
            'date' => $this->date,
            'formated_date' => date(str_replace('y', 'Y', (getSettingValue('date_format') ?? 'Y-m-d')), strtotime($this->date)),
            'clock_in' => $this->clock_in,
            'clock_out' => $this->clock_out,
            'formated_clock_in' => date('H:i', strtotime($this->clock_in)),
            'formated_clock_out' => date('H:i', strtotime($this->clock_out)),
        ];

        return $fields;
    }

    public function prepareAttendance(): array
    {
        $fields = [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'employee_name' => $this->employee->name,
            'date' => $this->date,
            'formated_date' => date(str_replace('y', 'Y', (getSettingValue('date_format') ?? 'Y-m-d')), strtotime($this->date)),
            'clock_in' => $this->clock_in,
            'clock_out' => $this->clock_out,
        ];

        return $fields;
    }

    public function employee(){
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }
}
