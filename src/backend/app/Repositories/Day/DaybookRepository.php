<?php

namespace App\Repositories\v1\Day;

use App\Models\Day\Daybook;

use App\Repositories\BaseRepository;

class DaybookRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Daybook::class;
    }
}
