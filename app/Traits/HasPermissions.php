<?php

namespace App\Traits;

use App\Models\Systems\Permission;
use Illuminate\Support\Facades\Auth;

trait HasPermissions
{
    protected $permissionList = null;

    // public function isAdmin($user)
    // {
    //     return $user->isAdmin();
    // }

    // public function hasPermission($user, $permission)
    // {
    //     return $user->hasPermission($permission);
    // }

    // public function hasPermission($permission = null)
    // {
    //     if (is_string($permission)) {
    //         return $this->getPermissions()->contains('key', $permission);
    //     }
    //     return false;
    // }

    // private function getPermissions()
    // {
    //     $role = $this->roles->first();
    //     if ($role) {
    //         if (! $role->relationLoaded('permissions')) {
    //             $this->roles->load('permissions');
    //         }
    //         $this->permissionList = $this->roles->pluck('permissions')->flatten();
    //     }
    //     return $this->permissionList ?? collect();
    // }

//    public function hasPermission($permission = null)
//    {
//        if (is_string($permission)) {
//            return $this->permissions()->where('key', $permission)->exists();
//        }
//        return false ;
//    }
    public function hasPermissionTo($permission)
    {
        return $this->permissions()->contains($permission);
    }
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'permission_user');
    }

    public function hasPermission($permission = null):bool
    {
        $permissions =  Auth::user()->permissions()->pluck('key')->toArray();
        if (in_array($permission, $permissions)) {
            return true;
        }
        return false;
    }

}
