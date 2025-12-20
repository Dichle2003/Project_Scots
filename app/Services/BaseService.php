<?php

namespace App\Services;

use App\Repositories\Support\AbstractRepository as BaseRepository;

class BaseService
{
    /**
     *
     * @var BaseRepository
     */
    protected $repository;


    /**
     * get list
     *
     * @return mixed
     */
    public function getAll()
    {
        return $this->repository->getAll();
    }

    /**
     * find item by id
     *
     * @return mixed
     */
    public function findById($id)
    {
        return $this->repository->findById($id);
    }
}
