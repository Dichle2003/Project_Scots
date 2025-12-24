<?php
namespace App\Services\Systems;
use App\Repositories\Systems\CenterRepository;
use App\Services\BaseService;
use Illuminate\Cache\Repository;

class CenterService extends BaseService{
    public function __construct( protected CenterRepository $repo ){}
    public function getData($request){
        return $this->repo->getData($request);
    }
    public function createData($request){
       return $this->repo->create($request->all());
    }
    public function updateData($id, $request){
        return $this->repo->update($id, $request->all());
    }
    public function deleteData($id){
        return $this->repo->delete($id);
    }
}
