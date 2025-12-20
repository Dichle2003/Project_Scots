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
}
