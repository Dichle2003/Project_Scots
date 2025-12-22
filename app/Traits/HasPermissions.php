<?php

namespace App\Traits;

use App\Models\Systems\Permission;
use Illuminate\Support\Facades\Auth;

trait HasPermissions
{
    protected $permissionList = null;
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
