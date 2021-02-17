<?php

namespace App\Models\Day\Daybook;

use Illuminate\Database\Eloquent\Model;

class DaybookLogHistory extends Model
{
    protected $table = 'daybook_log_history';

    protected $guarded = ['id'];

    protected $fillable = [
        'daybook_log_id',
        'log'
    ];
}
