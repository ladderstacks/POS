<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE `attendance`
            CHANGE `clock_in` `clock_in` time NOT NULL AFTER `date`,
            CHANGE `clock_out` `clock_out` time NOT NULL AFTER `clock_in`');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
