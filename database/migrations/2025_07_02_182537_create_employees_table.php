<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('employee_id')->uniqid();
            $table->string('fisrt_name');
            $table->string('middle_name')->default('');
            $table->string('last_name');
            $table->date('date_of_birth')->nullable();
            $table->string('nationality')->nullable();
            $table->enum('marital_status', ['Unmarried', 'Married'])->nullable();
            $table->string('emirates_id')->nullable();
            $table->string('passport_number')->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other'])->default('Male');

            // contact_informations
            $table->string('email');
            $table->string('phone_number')->nullable();
            $table->string('alternate_phone_number')->nullable();
            $table->string('emergency_contact_name')->nullable();
            $table->string('address')->nullable();
            $table->integer('country_id', false, true)->constrained('countries')->cascadeOnDelete()->cascadeOnUpdate();

            // employment_details
            $table->date('hire_date');
            $table->string('job_title');
            $table->string('department');
            $table->enum('employment_type', ['Full-time', 'Part-time', 'Contract'])->nullable();
            $table->foreignId('reporting_manager_id')->nullable()->constrained('employees')->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('employee_status', ['Active', 'On Leave', 'Terminated'])->nullable();
            $table->date('termination_date')->nullable();
            $table->text('exit_reason')->nullable();
            $table->timestamps();
        });

        Schema::create('payrolls', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete()->cascadeOnUpdate();
            $table->decimal('basic_salary', 10, 2);
            $table->foreignId('bank_account_id')->nullable()->constrained('bank_account_details')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('tax_identification_number')->nullable();
            $table->enum('payment_method', ['Bank Transfer', 'Check', 'Cash'])->nullable();
            $table->enum('benefits', ['Health Insurance', 'Retirement']);
            $table->timestamps();
        });

        Schema::create('attendance', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete()->cascadeOnUpdate();
            $table->date('date')->nullable();
            $table->date('clock_in');
            $table->date('clock_out');
            $table->timestamps();
        });

        Schema::create('leave_balance', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('type', ['Sick Leave', 'Vacation']);
            $table->decimal('value')->default(0);
            $table->timestamps();
        });

        Schema::create('leave_requests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('type', ['Sick Leave', 'Vacation']);
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });

        Schema::create('educations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('degree');
            $table->string('intitution');
            $table->string('year');
            $table->tinyInteger('order')->unsigned()->default(0);
            $table->timestamps();
        });

        Schema::create('experiences', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('comapny');
            $table->string('experience');
            $table->date('join_date');
            $table->date('release_date')->nullable();
            $table->tinyInteger('order')->unsigned()->default(0);
            $table->timestamps();
        });


        Artisan::call('db:seed', ['class' => 'AddManageEmployeePermissons']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
