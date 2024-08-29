
<style>
  .nav_fixed {
    transition: all 0.3s;
  }

  .nav_static {
    background: #fff;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }
</style>

<?php
    $user = auth()->user();
    $SA = $user ? $user->hasRole('SUPER-ADMIN') : false;
    $editHome = request()->edithome;
?>

<nav id="app-navbar" class="navbar navbar-expand-lg navbar-light fixed-top nav_fixed">
  <div class="container py-1">
    <div class="d-flex align-items-center">
      <img width="36px" height="36px" class="rounded" src="{{asset($app->logo)}}" alt="">
      <h5 class="ms-3 fw-bold">
        <a class="navbar-brand" href="/">{{$app->title}}</a>
      </h5>
   </div>
    <button id="mobile-menu" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <!-- Center Of Navbar -->
      <ul class="navbar-nav w-100 d-flex justify-content-center">
        <li class="nav-item text-center pe-lg-3" onclick="scrollFunction('home-header')">
          <a class="nav-link" href="#home">{{__('Home')}}</a>
        </li>
        <li class="nav-item text-center pe-lg-3" onclick="scrollFunction('create-link')">
          <a class="nav-link" href="#create-link">{{__('Link')}}</a>
        </li>
        <li class="nav-item text-center pe-lg-3" onclick="scrollFunction('create-block')">
          <a class="nav-link" href="#create-link">{{__('Block')}}</a>
        </li>
        <li class="nav-item text-center pe-lg-3" onclick="scrollFunction('create-qr-code')">
          <a class="nav-link" href="#create-project">{{__('QR Code')}}</a>
        </li>
        <li class="nav-item text-center pe-lg-3" onclick="scrollFunction('pricing')">
          <a class="nav-link" href="#pricing">{{__('Pricing')}}</a>
        </li>
        <li class="nav-item text-center pe-lg-3" onclick="scrollFunction('testimonials')">
          <a class="nav-link" data-scroll href="#testimonials">{{__('Testimonials')}}</a>
        </li>
      </ul>

      <!-- Right Side Of Navbar -->
      <ul class="navbar-nav ms-auto">
          <!-- Authentication Links -->
          @guest
            @if (Route::has('login'))
              <li class="nav-item text-center">
                  <a class="nav-link" href="{{ route('login') }}">
                    <button class="btn btn-light">{{__('Login')}}</button>
                  </a>
              </li>
            @endif

            @if (Route::has('register'))
              <li class="nav-item text-center">
                  <a class="nav-link" href="{{ route('register') }}">
                    <button class="btn btn-primary text-white" style="width: 150px">
                      {{__('Sign up for free')}}
                    </button>
                  </a>
              </li>
            @endif
          @else
            @if($SA)
              <li class="nav-item text-center">
                <a class="nav-link" href="{{$editHome ? '/' : '/?edithome=true'}}">
                  {{$editHome ? 'Back' : 'Customize'}}
                </a>
              </li>
            @endif
            <li class="nav-item text-center">
              <a class="nav-link" href="{{url('/dashboard')}}">{{__('Dashboard')}}</a>
            </li>
            <li class="nav-item text-center dropdown">
                <a 
                  v-pre
                  href="#" 
                  role="button" 
                  id="navbarDropdown" 
                  class="nav-link dropdown-toggle" 
                  data-bs-toggle="dropdown" 
                  aria-haspopup="true" 
                  aria-expanded="false" 
                >
                    {{ Auth::user()->name }}
                </a>

                <div 
                  aria-labelledby="navbarDropdown"
                  class="dropdown-menu dropdown-menu-end text-center" 
                >
                    <a class="dropdown-item logout-button" href="{{ route('logout') }}">
                        {{ __('Logout') }}
                    </a>

                    <form action="{{ route('logout') }}" method="POST" class="d-none logout-form">
                        @csrf
                    </form>
                </div>
            </li>
          @endguest
      </ul>
    </div>
  </div>
</nav>