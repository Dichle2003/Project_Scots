<?php

namespace App\Services\Systems;

use App\Enums\CommonEnum;
use App\Services\BaseService;
use App\Repositories\Systems\UserRepository as Repo;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
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
    public function createData($request)
    {
        $data = $request->only('name', 'birthday', 'phone', 'personal_email', 'so_cccd', 'date_of_issue', 'noi_cap_cccd');
        $data['email'] = $this->renderEmailByName($data['name']);
        $data['password'] = Hash::make('Scots@2026');
        $user = $this->repo->create($data);

    }
    public function deleteData($id)
    {
        return $this->repo->delete($id);
    }

    public function renderEmailByName($name): string
    {
        $arrStringName = explode(' ', $name);
        $lastName = Str::slug(end($arrStringName));
        if(count($arrStringName) < 3){
            $lastName = Str::slug($name, '');
        }else{
            array_pop($arrStringName);
            foreach ($arrStringName as $val){
                $text = Str::slug($val);
                $lastName.=strtolower($text[0]);
            }
        }
        for($i=0; $i<=100; $i++){
            $name = $lastName;
            if($i>0){
                $name.=$i;
            }
            $email =$name.'@scotsenglish.com';
            $checkUser = $this->checkEmail($email);
            if(!$checkUser){
                break;
            }
        }
        return $email;
    }
    protected function checkEmail($email):bool
    {
        return $this->repo->checkEmail($email);
    }
}
