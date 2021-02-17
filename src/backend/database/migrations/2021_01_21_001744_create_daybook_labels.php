<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDaybookLabels extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daybook_labels', function (Blueprint $table) {
            $table->id();

            $table->string('title', 100);

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('daybook_labels_pivot', function (Blueprint $table) {
            $table->id();

            $table->integer('daybook_id')->unsigned();
            $table->integer('daybook_label_id')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('daybook_labels');
        Schema::dropIfExists('daybook_labels_pivot');
    }
}
