<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('status');
            $table->float('monthly_price');
            $table->float('yearly_price');
            $table->string('currency');
            $table->string('biolinks');
            $table->integer('biolink_blocks');
            $table->string('shortlinks');
            $table->string('projects');
            $table->string('qrcodes');
            $table->string('themes');
            $table->boolean('custom_theme');
            $table->integer('support');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pricing_plans');
    }
};
