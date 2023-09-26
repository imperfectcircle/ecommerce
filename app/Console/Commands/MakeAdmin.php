<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MakeAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crea un utente con accesso super admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = $this->getUserInfo();

        if (!$user) {
            return 0;
        }

        $this->assignRole($user);

        $this->info(
            'L\'utente ' . $user->email . ' ha ora completo accesso al sito',
        );

        return 1;
    }

    /**
     * Get the user information from the user.
     *
     * @return bool|User
     */
    public function getUserInfo(): bool|User
    {
        $email = $this->ask(
            'Qual è l\'indirizzo email dell\'utente che vuoi rendere admin?',
        );

        $user = User::where('email', $email)->first();

        if (!is_null($user)) {
            return $user;
        }

        $name = $this->ask('What is their name?');
        $password = $this->secret(
            'Qual è la password dell\'utente che vuoi rendere admmin?',
        );

        $passwordConfirmation = $this->secret(
            'Per favore conferma la password dell\'utente che vuoi rendere admin',
        );

        $validator = Validator::make(
            [
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'password_confirmation' => $passwordConfirmation,
            ],
            [
                'name' => ['required', 'string', 'max:255'],
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    'unique:users',
                ],
                'password' => $this->passwordRules(),
            ],
        );

        if ($validator->fails()) {
            $this->error('Operazione fallita. Per favore controlla gli errori qui sotto:');

            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return false;
        }

        return User::create([
            ...$validator->validated(),
            'password' => Hash::make($password),
        ]);
    }

    /**
     * Assign the super admin role to the user
     *
     * @param User $user
     * @return void
     */
    public function assignRole(User $user): void
    {
        $role = Role::findOrCreate('super admin');
        $user->assignRole($role);
    }
}

