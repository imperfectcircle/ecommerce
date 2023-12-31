<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Option;
use Illuminate\Auth\Access\HandlesAuthorization;

class OptionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view all options');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $option
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Option $option): bool
    {
        return $user->can('view option', $option);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user): bool
    {
        return $user->can('create option');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $option
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Option $option): bool
    {
        return $user->can('update option', $option);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $option
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Option $option): bool
    {
        return $user->can('delete option', $option);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $option
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Option $option): bool
    {
        return $user->can('restore option', $option);
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $option
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Option $option): bool
    {
        return $user->can('force delete option', $option);
    }
}
