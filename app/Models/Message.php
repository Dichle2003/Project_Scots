<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        'conversation_id',
        'role',
        'content'
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    // 👇 relationship
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}
