<?php

namespace App\Services\Systems;

use App\Services\BaseService;
use App\Repositories\Systems\UserRepository as Repo;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserService extends BaseService
{
    public function __construct(
        protected Repo $repo,
    ){}

    public function getData($request)
    {
        return $this->repo->getData($request);
    }
}
