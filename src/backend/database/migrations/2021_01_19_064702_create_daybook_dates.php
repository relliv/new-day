<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDaybookDates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daybook_dates', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('daybook_id');
            $table->foreign('daybook_id')->references('id')->on('daybooks')->onDelete('cascade');

            $table->date('target_date');

            $table->unique(['daybook_id', 'target_date']);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('daybook_dates'))
        {
            Schema::disableForeignKeyConstraints();

            Schema::table('daybook_dates', function(Blueprint $table){
                $table->dropForeign(['daybook_id']);
                $table->dropIfExists();
            });

            Schema::enableForeignKeyConstraints();
        }
    }
}
