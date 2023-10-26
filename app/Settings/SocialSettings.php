<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class SocialSettings extends Settings
{
    public string $facebook_link;

    public string $instagram_link;

    public string $tik_tok_link;

    public static function group(): string
    {
        return 'social';
    }
}