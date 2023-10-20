<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function products() {
        return $this->belongsToMany(Product::class);
    }

    public function values() {
        return $this->hasMany(Value::class);
    }

    public function variations() {
        return $this->hasMany(Variation::class);
    }
}
