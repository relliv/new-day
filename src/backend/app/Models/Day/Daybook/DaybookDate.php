<?php

namespace App\Models\Day\Daybook;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DaybookDate extends Model
{
    protected $table = 'daybook_dates';

    protected $guarded = ['id'];

    protected $fillable = [
        'daybook_id',
        'target_date'
    ];

    public function logs(): HasMany
    {
        return $this->hasMany(DaybookLog::class)->orderBy('id', 'DESC');
    }

    public function lastLog(): HasOne
    {
        return $this->hasOne(DaybookLog::class)->orderBy('id', 'DESC');
    }
}
