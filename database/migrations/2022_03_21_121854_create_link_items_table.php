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
        Schema::create('link_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('link_id');
            $table->bigInteger('item_position');
            $table->string('item_type');
            $table->string('item_sub_type')->nullable();
            $table->string('item_title');
            $table->string('item_link')->nullable();   
            $table->text('item_icon');
            $table->text('content')->nullable();   
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
        Schema::dropIfExists('link_items');
    }
};
