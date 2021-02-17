<?php

namespace App\Http\Controllers\Api\v1\Day;

use Illuminate\Support\Facades\Cache;

use App\Http\Controllers\Controller;

use App\Repositories\v1\Day\DiaryRepository;
use App\Http\Requests\Api\v1\Day\DiaryRequest;

class DiaryController extends Controller
{
    protected $diaryRepository = null;
    
    public function __construct(
        DiaryRepository $diaryRepository
    )
    {
        $this->diaryRepository = $diaryRepository;
    }

    public function index(){
        $items = $this->diaryRepository->paginate(25);

        return view('path.to.index', compact(
            'items'
        ));
    }

    public function create(){}

    public function show($id){
        $item = $this->diaryRepository->find($id);

        return $this->jsonResponse($item);
    }

    public function store(DiaryRequest $request){
        $result = $this->diaryRepository->create($request->all());

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

    public function update(DiaryRequest $request, $id){
        $result = $this->diaryRepository->update($request->all(), $id);

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
        $item = $this->diaryRepository->find($id);

        if ($item){
            $result = $item->delete();

            if ($result){
                //$categoryRelationsResult = $this->diaryRepository->removeAllRelations($item->id, false);

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
