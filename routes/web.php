<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\QRCodeController;
use App\Http\Controllers\BioLinkController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ShortLinkController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AppSettingsController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\BioLinkBlockController;
use App\Http\Controllers\BioLinkCustomizeController;
use App\Http\Controllers\BioLinkCustomThemeController;
use App\Http\Controllers\CustomPageController;
use App\Http\Controllers\PaymentSettingsController;
use App\Http\Controllers\Gateways\MollieController;
use App\Http\Controllers\Gateways\PaypalController;
use App\Http\Controllers\Gateways\PaystackController;
use App\Http\Controllers\Gateways\RazorpayController;
use App\Http\Controllers\Gateways\StripeController;
use App\Http\Controllers\InstallerController;
use App\Http\Controllers\InstallerDBController;
use App\Http\Controllers\LocalizationController;
use App\Http\Controllers\PricingPlanController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VersionController;

use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$installed = Storage::disk('public')->exists('installed');

$ADMIN_PERMISSION = ['auth', 'web', 'role:SUPER-ADMIN'];
$ADMIN_USER_PERMISSION = ['auth', 'verified', 'role:SUPER-ADMIN|PREMIUM|STANDARD|BASIC'];

Route::get('migrate', [HomeController::class, 'migrate']);

if ($installed) {
    require __DIR__ . '/auth.php';
    require __DIR__ . '/local.php';
    Route::get('/', [HomeController::class, 'index']);

    Route::middleware($ADMIN_USER_PERMISSION)->prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index']);

        Route::resource('bio-links', BioLinkController::class)->only(['index', 'update', 'destroy']);
        Route::post('bio-links', [BioLinkController::class, 'store'])->name('bio-links.store')->middleware('check_payment');

        Route::prefix('bio-links')->group(function () {
            Route::get('export', [BioLinkController::class, 'export'])->name('bio-links.export');

            Route::resource('customize', BioLinkCustomizeController::class)->only(['store', 'show', 'update']);
            Route::prefix('customize')->group(function () {
                Route::post('logo/{id}', [BioLinkCustomizeController::class, 'logo'])->name('customize.logo');
                Route::put('socials/{id}', [BioLinkCustomizeController::class, 'social'])->name('customize.socials');

                Route::prefix('custom-theme')->group(function () {
                    Route::post('/', [BioLinkCustomThemeController::class, 'store'])->name('custom-theme.store');
                    Route::put('/{id}', [BioLinkCustomThemeController::class, 'active'])->name('custom-theme.active');
                    Route::post('/{id}', [BioLinkCustomThemeController::class, 'update'])->name('custom-theme.update');
                });

                Route::resource('biolink-block', BioLinkBlockController::class)->only(['store', 'destroy']);
                Route::post('block/{id}', [BioLinkBlockController::class, 'update'])->name('biolink-block.update');
                Route::put('block/{linkId}', [BioLinkBlockController::class, 'position'])->name('biolink-block.position');
            });
        });

        Route::resource('short-links', ShortLinkController::class)->only(['index', 'update', 'destroy']);
        Route::post('short-links', [ShortLinkController::class, 'store'])->name('short-links.store')->middleware('check_payment');
        Route::get('short-links/export', [ShortLinkController::class, 'export'])->name('short-links.export');
        Route::get('/link/analytics/{id}', [ShortLinkController::class, 'analytics'])->name('link.analytics');

        Route::resource('qrcodes', QRCodeController::class)->only(['index', 'destroy']);
        Route::get('qrcodes/create', [QRCodeController::class, 'create'])->name('qrcodes.create')->middleware('check_payment');
        Route::post('qrcodes', [QRCodeController::class, 'store'])->name('qrcodes.store')->middleware('check_payment');

        Route::resource('projects', ProjectController::class)->only(['index', 'create', 'show', 'update', 'destroy']);
        Route::post('projects', [ProjectController::class, 'store'])->name('projects.store')->middleware('check_payment');
        Route::get('projects/export', [ProjectController::class, 'export'])->name('projects.export');

        Route::prefix('settings')->group(function () {
            Route::get('/', [SettingsController::class, 'index'])->name('settings.index');
            Route::post('/profile', [SettingsController::class, 'profile'])->name('settings.profile');
        });

        Route::prefix('current-plan')->group(function () {
            Route::get('{id}', [PricingPlanController::class, 'show'])->name('current-plan.show');
            Route::get('show/plans', [PricingPlanController::class, 'index'])->name('current-plan.update');
            Route::get('selected/{id}', [PricingPlanController::class, 'selected'])->name('current-plan.selected');
            Route::post('basic-plan/{id}', [PricingPlanController::class, 'basicPlan'])->name('current-plan.basic-plan');
        });
    });

    Route::middleware($ADMIN_USER_PERMISSION)->group(function () {
        Route::get('billing/{id}', [SubscriptionController::class, 'billing'])->name('billing');

        Route::post('paypal/payment', [PaypalController::class, 'payment'])->name('paypal.payment');
        Route::get('paypal/success', [PaypalController::class, 'success'])->name('paypal.success');
        Route::get('paypal/cancel', [PaypalController::class, 'cancel'])->name('paypal.cancel');

        Route::post('stripe/payment', [StripeController::class, 'payment'])->name('stripe.payment');
        Route::get('stripe/success', [StripeController::class, 'success'])->name('stripe.success');
        Route::get('stripe/cancel', [StripeController::class, 'cancel'])->name('stripe.cancel');

        Route::get('razorpay/form', [RazorpayController::class, 'show_form'])->name('razorpay.form');
        Route::post('razorpay/payment', [RazorpayController::class, 'payment'])->name('razorpay.payment');

        Route::post('mollie/payment', [MollieController::class, 'payment'])->name('mollie.payment');
        Route::get('mollie/success', [MollieController::class, 'success'])->name('mollie.success');

        Route::get('paystack/redirect', [PaystackController::class, 'paystack_redirect'])->name('paystack.redirect');
        Route::get('paystack/callback', [PaystackController::class, 'verify_transaction'])->name('paystack.callback');
    });

    // Only admin routes
    Route::middleware($ADMIN_PERMISSION)->prefix('dashboard/admin')->group(function () {
        Route::resource('users', UsersController::class)->only(['index', 'update']);
        Route::get('users/export', [UsersController::class, 'export'])->name('users.export');

        Route::prefix('/manage-themes')->group(function () {
            Route::get('/', [ThemeController::class, 'index'])->name('manage-themes.index');
            Route::put('type/{id}', [ThemeController::class, 'themeType'])->name('manage-themes.type');
        });

        Route::prefix('/subscriptions')->group(function () {
            Route::get('/', [SubscriptionController::class, 'subscriptions'])->name('subscriptions.index');
            Route::get('export', [SubscriptionController::class, 'export'])->name('subscriptions.export');
        });

        Route::resource('testimonials', TestimonialController::class)->only(['index', 'store', 'destroy']);
        Route::post('testimonials/{id}', [TestimonialController::class, 'update'])->name('testimonials.update');

        Route::resource('pricing-plans', PricingPlanController::class);

        Route::prefix('app-settings')->group(function () {
            Route::get('/', [AppSettingsController::class, 'index']);
            Route::post('app/update', [AppSettingsController::class, 'appUpdate'])->name('settings.app');
            Route::patch('auth/google', [AppSettingsController::class, 'authGoogle'])->name('settings.google');
            Route::patch('smtp/update', [AppSettingsController::class, 'smtpUpdate'])->name('settings.smtp');
        });

        Route::get('app-control', [AppSettingsController::class, 'appControl']);

        Route::resource('translation', LocalizationController::class)->only(['index', 'edit']);

        Route::resource('payments-setup', PaymentSettingsController::class)->only(['index', 'update']);

        Route::resource('custom-page', CustomPageController::class);
    });

    // Intro page update for only admin
    Route::middleware($ADMIN_PERMISSION)->group(function () {
        Route::put('home-section/{id}', [HomeController::class, 'section'])->name('home-section.update');
        Route::put('home-section/list/{id}', [HomeController::class, 'sectionList'])->name('home-section.list');

        Route::get('/version/check', [VersionController::class, 'checkVersion']);
        Route::get('/version/current', [VersionController::class, 'getCurrentVersion']);
        Route::get('/version/update', [VersionController::class, 'updateVersion']);
    });

    Route::get('/{linkName}', [BioLinkController::class, 'visitLink']);

    Route::get('/app/{page}', [CustomPageController::class, 'show'])->name('custom-page.view');
} else {

    Route::prefix('/setup')->group(function () {
        Route::get('/', [InstallerController::class, 'checkServer'])->name('setup');

        Route::get('/step-1', [InstallerController::class, 'viewStep1'])->name('view.step1');
        Route::post('/step-1', [InstallerController::class, 'setupStep1'])->name('setup.step1');

        Route::get('/step-2', [InstallerController::class, 'viewStep2'])->name('view.step2');
        Route::post('/step-2', [InstallerController::class, 'setupStep2'])->name('setup.step2');

        Route::get('/step-3', [InstallerController::class, 'viewStep3'])->name('view.step3');
        Route::post('/step-3', [InstallerController::class, 'setupStep3'])->name('setup.step3');

        Route::get('/install', [InstallerController::class, 'installView']);
        Route::post('/install', [InstallerController::class, 'installVersion']);

        Route::post('/check-database', [InstallerDBController::class, 'databaseChecker']);
        Route::get('/generate-app-key', [InstallerController::class, 'generateAppKey']);
    });
    Route::get('/{url?}', [InstallerController::class, 'backToSetup'])->where('url', '^(?!setup).*$');
}
