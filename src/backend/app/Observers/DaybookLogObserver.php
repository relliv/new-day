<?php

namespace App\Observers;

use App\Models\Day\Daybook\DaybookLog;
use App\Models\Day\Daybook\DaybookLogHistory;

class DaybookLogObserver
{
    /**
     * Handle the DaybookLog "created" event.
     *
     * @param  \App\Models\DaybookLog  $daybookLog
     * @return void
     */
    public function created(DaybookLog $daybookLog)
    {
        //
    }

    /**
     * Handle the DaybookLog "updated" event.
     *
     * @param  \App\Models\DaybookLog  $daybookLog
     * @return void
     */
    public function updated(DaybookLog $daybookLog)
    {
        DaybookLogHistory::create([
            'daybook_log_id' => $daybookLog->id,
            'log' => $daybookLog->log
        ]);
    }

    /**
     * Handle the DaybookLog "deleted" event.
     *
     * @param  \App\Models\DaybookLog  $daybookLog
     * @return void
     */
    public function deleted(DaybookLog $daybookLog)
    {
        //
    }

    /**
     * Handle the DaybookLog "restored" event.
     *
     * @param  \App\Models\DaybookLog  $daybookLog
     * @return void
     */
    public function restored(DaybookLog $daybookLog)
    {
        //
    }

    /**
     * Handle the DaybookLog "force deleted" event.
     *
     * @param  \App\Models\DaybookLog  $daybookLog
     * @return void
     */
    public function forceDeleted(DaybookLog $daybookLog)
    {
        //
    }
}
