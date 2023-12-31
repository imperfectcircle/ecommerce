<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Variation;
use Illuminate\Auth\Access\HandlesAuthorization;

class VariationPolicy
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
        return $user->can('view all variations');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $variation
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Variation $variation): bool
    {
        return $user->can('view variation', $variation);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user): bool
    {
        return $user->can('create variation');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $variation
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Variation $variation): bool
    {
        return $user->can('update variation', $variation);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $variation
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Variation $variation): bool
    {
        return $user->can('delete variation', $variation);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $variation
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Variation $variation): bool
    {
        return $user->can('restore variation', $variation);
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $variation
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Variation $variation): bool
    {
        return $user->can('force delete variation', $variation);
    }
}
