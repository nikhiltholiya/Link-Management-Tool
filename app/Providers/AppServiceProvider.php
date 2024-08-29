<?php

namespace App\Providers;

use App\Models\User;
use App\Models\AppSetting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('setting', function () {
            try {
                $app = AppSetting::first();

                if ($app->hasMedia()) {
                    $app->logo = $app->getFirstMediaUrl();
                } else {
                    $app->logo = url('') . '/' . $app->logo;
                }

                return $app;
            } catch (\Throwable $th) {
                return;
            }
        });

        $this->app->singleton('user', function () {
            $user = null;

            if (auth()->user()) {
                $user = User::where('id', auth()->user()->id)->with('roles')->first();

                $media = $user->getMedia('*', ['name' => 'profile'])->first();
                $user->image = $media ? $media->getFullUrl() : null;
            }

            return $user;
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
    }
}
