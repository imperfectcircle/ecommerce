<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;

    public string $contact_email;

    public string $sender_email;

    public string $legal_name;

    public string $phone;

    public string $address;

    public string $city;

    public string $country;

    public string $currency;

    public string $currency_symbol;

    public string $google_analytics_code;

    public bool $active;

    public static function group(): string {
        return 'general';
    }
}