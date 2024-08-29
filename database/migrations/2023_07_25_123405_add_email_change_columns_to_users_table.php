<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add new columns if they don't exist
            if (!Schema::hasColumn('users', 'email_change_new_email')) {
                $table->string('email_change_new_email')->nullable();
            }

            if (!Schema::hasColumn('users', 'email_change_token')) {
                $table->text('email_change_token')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('email_change_new_email')->nullable();
            $table->text('email_change_token')->nullable();
        });
    }
};
