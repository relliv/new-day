<?php

namespace App\Models\Day\Daybook;

use Illuminate\Database\Eloquent\Model;

class DaybookLabel extends Model
{
    protected $table = 'daybook_labels';

    protected $guarded = ['id'];

    protected $fillable = [
        'title'
    ];
}
