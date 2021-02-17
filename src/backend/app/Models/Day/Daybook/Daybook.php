<?php

namespace App\Models\Day\Daybook;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Daybook extends Model
{
    protected $table = 'daybooks';

    protected $guarded = ['id'];

    protected $fillable = [
        'title',
        'description',
        'icon',
        'color',
        'archive'
    ];

    public function dates(): HasMany
    {
        return $this->hasMany(DaybookDate::class);
    }
}
