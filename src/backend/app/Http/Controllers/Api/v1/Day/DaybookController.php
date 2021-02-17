<?php

namespace App\Http\Controllers\Api\v1\Day;

use Illuminate\Support\Facades\Cache;

use App\Http\Controllers\Controller;

use App\Repositories\v1\Day\DaybookRepository;
use App\Http\Requests\Api\v1\Day\DaybookRequest;

class DaybookController extends Controller
{
    protected $daybookRepository = null;
    
    public function __construct(
        DaybookRepository $daybookRepository
    )
    {
        $this->daybookRepository = $daybookRepository;
    }

    public function index(){
        $items = $this->daybookRepository->paginate(25);

        return view('path.to.index', compact(
            'items'
        ));
    }

    public function create(){}

    public function show($id){
        $item = $this->daybookRepository->find($id);

        return $this->jsonResponse($item);
    }

    public function store(DaybookRequest $request){
        $result = $this->daybookRepository->create($request->all());

        if ($result){
            return $this->jsonResponse([
                'message' => 'Öğe eklendi',
                'reload' => true
            ], 200);    
        }

        return $this->jsonResponse([
            'message' =>  'İşlem başarısız'
        ], 400);
    }

    public function update(DaybookRequest $request, $id){
        $result = $this->daybookRepository->update($request->all(), $id);

        if ($result){
            return $this->jsonResponse([
                'message' => 'Öğe güncellendi',
                'reload' => true
            ], 200);    
        }

        return $this->jsonResponse([
            'message' =>  'İşlem başarısız'
        ], 400);
    }

    public function destroy($id){
        $item = $this->daybookRepository->find($id);

        if ($item){
            $result = $item->delete();

            if ($result){
                //$categoryRelationsResult = $this->daybookRepository->removeAllRelations($item->id, false);

                return $this->jsonResponse([
                    'message' => 'Öğe silindi.'
                ], 200);
            }
        }

        return $this->jsonResponse([
            'message' => 'Öğe silinemedi'
        ], 400);
    }
}
