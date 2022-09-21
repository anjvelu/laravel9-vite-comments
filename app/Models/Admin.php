<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasFactory;

    protected $guard = 'admin';

    public function comments()
    {
        return $this->hasMany(Comment::class, 'admin_id');
    }

    public function getName()
    {
        return $this->name;
    }
}
