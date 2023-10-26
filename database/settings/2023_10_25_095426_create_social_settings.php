<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('social.facebook_link', '');
        $this->migrator->add('social.instagram_link', '');
        $this->migrator->add('social.tik_tok_link', '');
    }
};
