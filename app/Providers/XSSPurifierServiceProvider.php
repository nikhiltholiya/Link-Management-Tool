<?php

namespace App\Providers;

use HTMLPurifier;
use Illuminate\Support\ServiceProvider;

class XSSPurifierServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton('htmlpurifier', function () {
            return new HTMLPurifier();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
