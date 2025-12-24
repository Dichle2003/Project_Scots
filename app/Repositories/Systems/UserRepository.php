<?php

namespace App\Repositories\Systems;

use App\Models\User;
use App\Repositories\Support\AbstractRepository;

class UserRepository extends  AbstractRepository
{
    /**
     * @return mixed|string
     */
    public function model()
    {
        return User::class;
    }
    public function getData($request)
    {
        $query = $this->model;
        if ($request->search) {
            $query = $query->where(function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('phone', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }
        if ($request['sort_by'] && $request['sort_order']) {
            $query = $query->orderBy($request['sort_by'], $request['sort_order']);
        }else{
            $query = $query->orderBy('id', 'desc');
        }
        return $query->paginate($request['limit'] ?? 20);
    }

    public function checkEmail($email):bool
    {
        return $this->model->where('email', $email)->exists();
    }
}
