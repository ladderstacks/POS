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
        Schema::create('bank_account_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('bank_name');
            $table->string('account_holder_name');
            $table->string('account_number');
            $table->enum('account_type', ['Savings', 'Current', 'Business'])->default('Savings');
            $table->string('bank_branch');
            $table->string('routing_number')->comment('ABA, SWIFT/BIC, IFSC, etc., depending on country');
            $table->foreignId('currency_id')->constrained('currencies')->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('country_id', false, true)->constrained('countries')->cascadeOnDelete()->cascadeOnUpdate();
            $table->boolean('is_primary_account')->default(false);
            $table->text('note')->default('');
            $table->timestamps();
        });

        Artisan::call('db:seed', ['class' => 'AddManageBankDetailsPermissons']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_account_details');
    }
};
