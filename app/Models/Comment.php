<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'description'
    ];

    const CREATED_AT = 'created_at';

    const UPDATED_AT = Null;

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}
