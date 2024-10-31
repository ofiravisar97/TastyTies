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
        Schema::create('user_data', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("user_id");
            $table->string("bio")->nullable()->default(null);
            $table->integer('followers_count')->default(0);
            $table->integer('recipes_count')->default(0);
            $table->integer('bookmarks_count')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_data');
    }
};
