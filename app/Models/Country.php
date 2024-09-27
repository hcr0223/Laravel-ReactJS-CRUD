<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function states() {
        return $this->hasMany(State::class, 'country_id', 'id');
    }

    // Declaring a event handlers
    public static function boot() {
        parent::boot();
        self::deleting(function($country) {
            $country->states()->each(function($state) {
                $state->delete();
            });
        });
    }
}
