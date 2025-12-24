<?php
namespace App\Repositories\Systems;
use App\Models\Center;
use App\Repositories\Support\AbstractRepository;

class CenterRepository extends AbstractRepository{
  public function model()
  {
        return Center::class;
  }
  public function getData($request){
      $query= $this->model;
      if ($request->search) {
          $query = $query->where(function ($query) use ($request) {
              $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('code', 'like', '%' . $request->search . '%');

          });
      }
      if ($request['sort_by'] && $request['sort_order']) {
          $query = $query->orderBy($request['sort_by'], $request['sort_order']);
      }else{
          $query = $query->orderBy('id', 'desc');
      }
      return $query->paginate($request['limit'] ?? 20);

  }


}
