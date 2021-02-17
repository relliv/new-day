<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDaybookLogs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daybook_logs', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('daybook_id');
            // Todo: update on delete
            $table->foreign('daybook_id')->references('id')->on('daybooks')->onDelete('cascade');
            $table->unsignedBigInteger('daybook_date_id');
            $table->foreign('daybook_date_id')->references('id')->on('daybook_dates')->onDelete('cascade');

            $table->string('title', 150)->nullable()->default(null);
            $table->text('log')->nullable()->default(null);

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('daybook_log_history', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('daybook_log_id');
            $table->foreign('daybook_log_id')->references('id')->on('daybook_logs')->onDelete('cascade');

            $table->text('log')->nullable()->default(null);

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
        if (Schema::hasTable('daybook_logs'))
        {
            Schema::disableForeignKeyConstraints();

            Schema::table('daybook_logs', function(Blueprint $table){
                $table->dropForeign(['daybook_id']);
                $table->dropForeign(['daybook_date_id']);
                $table->dropIfExists();
            });

            Schema::enableForeignKeyConstraints();
        }

        if (Schema::hasTable('daybook_log_history'))
        {
            Schema::disableForeignKeyConstraints();

            Schema::table('daybook_log_history', function(Blueprint $table){
                $table->dropForeign(['daybook_log_id']);
                $table->dropIfExists();
            });

            Schema::enableForeignKeyConstraints();
        }
    }
}
