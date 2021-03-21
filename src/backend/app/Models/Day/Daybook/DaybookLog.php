<?php

namespace App\Models\Day\Daybook;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DaybookLog extends Model
{
    protected $table = 'daybook_logs';

    protected $guarded = ['id'];

    protected $fillable = [
        'daybook_id',
        'daybook_date_id',
        'title',
        'log'
    ];

    public function daybookDate(): BelongsTo
    {
        return $this->belongsTo(DaybookDate::class);
    }

    public function history(): HasMany
    {
        return $this->hasMany(DaybookLogHistory::class)->orderBy('id', 'DESC');
    }

    // /**
    //  * Ecrypt the log
    //  * Todo: update with user pin or password
    //  *
    //  * @param  string  $value
    //  * @return string
    //  */
    // public function setLogAttribute($value)
    // {
    //     $this->attributes['log'] = Crypt::encryptString($value);
    // }

    // /**
    //  * Decrypt the log
    //  *
    //  * @param  string  $value
    //  * @return string
    //  */
    // public function getLogAttribute($value)
    // {
    //     $decryptedValue = null;

    //     if (!empty($value)){
    //         try {
    //             $decryptedValue = Crypt::decryptString($value);
    //         } catch (\Exception $exp){
    //             // Todo: log...
    //             return $value;
    //         }
    //     } else {
    //         return $value;
    //     }

    //     return $decryptedValue;
    // }
}
