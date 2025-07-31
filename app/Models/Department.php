<?php

namespace App\Models;

use App\Models\Contracts\JsonResourceful;
use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Department extends Model implements HasMedia, JsonResourceful
{
    use HasFactory, InteractsWithMedia, HasJsonResourcefulData;

    protected $table = 'departments';

    const JSON_API_TYPE = 'departments';

    protected $fillable = [
        'name',
        'description',
        'status',
    ];

    public const PATH = '';

    protected $appends = [];

    public static $rules = [
        'name' => 'required|bail',
        'description' => 'required|bail',
        'status' => 'required|bail',
    ];

    public function prepareLinks(): array
    {
        return [
            'self' => route('departments.show', $this->id),
        ];
    }

    public function prepareAttributes(): array
    {
        $fields = [
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,

        ];

        return $fields;
    }

    public function prepareDepartment(): array
    {
        $fields = [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
        ];

        return $fields;
    }
}
