<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $themes = array(
            array(
                'name' => 'Basic',
                'background' => "
                    background: #FFFFFF;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FFFFFF;
                    border-radius: 30px;
                    box-shadow: 0px 6px 14px -6px rgb(24 39 75 / 12%), 0px 10px 32px -4px rgb(24 39 75 / 10%), inset 0px 0px 2px 1px rgb(24 39 75 / 5%);
                ',
                'font_family' => "'Inter', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/basic.png',
                'bg_image' => null,
                'type' => 'Free',
            ),
            array(
                'name' => 'Dark Carbon',
                'background' => "
                    background: #131212;
                ",
                'text_color' => '#FFFFFF',
                'button_style' => '
                    background: #212121;
                    border-radius: 8px;
                    box-shadow: 0px 6px 14px -6px rgb(24 39 75 / 12%), 0px 10px 32px -4px rgb(24 39 75 / 10%), inset 0px 0px 2px 1px rgb(255 255 255 / 5%);
                ',
                'font_family' => "'Inter', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/dark-carbon.png',
                'bg_image' => null,
                'type' => 'Free',
            ),
            array(
                'name' => 'Glitch',
                'background' => "
                    background: #FFFFFF;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    border-radius: 4px;
                    background: #FFFFFF;
                    border: 2px solid #000000;
                    box-shadow: 4px 4px 0 #222222;
                ',
                'font_family' => "'MintGrotesk', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/glitch.png',
                'bg_image' => null,
                'type' => 'Free',
            ),
            array(
                'name' => 'Unicorn',
                'background' => '
                    background: #f5fdf4;
                ',
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #BFB9FA;
                    border-radius: 12px;
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/unicorn.png',
                'bg_image' => null,
                'type' => 'Free',
            ),
            array(
                'name' => 'Chameleon',
                'background' => "
                    background: #E0EDCD;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    border-radius: 30px;
                    background: #007034;
                ',
                'font_family' => "'Quicksand', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/chameleon.png',
                'bg_image' => null,
                'type' => 'Standard',
            ),
            array(
                'name' => 'Sunny',
                'background' => '
                    background: #fefceb;
                ',
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FFDD00;
                    border-radius: 30px;
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/sunny.png',
                'bg_image' => null,
                'type' => 'Standard',
            ),
            array(
                'name' => 'Autumn',
                'background' => '
                    background: #fff4f1;
                ',
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FF9877;
                    border-radius: 30px;
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/autumn.png',
                'bg_image' => null,
                'type' => 'Standard',
            ),
            array(
                'name' => 'Leaf',
                'background' => '
                    background: #f5fdf4;
                ',
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #A6EB99;
                    border-radius: 30px;
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/leaf.png',
                'bg_image' => null,
                'type' => 'Standard',
            ),
            array(
                'name' => 'Clear Sky',
                'background' => '
                    background: #eff9ff;
                ',
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #5ACAF9;
                    border-radius: 12px;
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/clear-sky.png',
                'bg_image' => null,
                'type' => 'Standard',
            ),
            array(
                'name' => 'Blush',
                'background' => '
                    background: #fff3fc;
                ',
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FF90E8;
                    border-radius: 12px;
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/blush.png',
                'bg_image' => null,
                'type' => 'Standard',
            ),
            array(
                'name' => 'Colorful',
                'background' => "
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FFFFFF;
                    border-radius: 4px;
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/colorful.png',
                'bg_image' => 'storage/themes/colorful.jpg',
                'type' => 'Standard',
            ),
            array(
                'name' => 'Winter',
                'background' => "
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FFFFFF;
                    border-radius: 8px;
                    box-shadow: 0px 6px 14px -6px rgb(24 39 75 / 12%), 0px 10px 32px -4px rgb(24 39 75 / 10%), inset 0px 0px 2px 1px rgb(24 39 75 / 5%);
                ',
                'font_family' => "'Inter', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/winter.png',
                'bg_image' => 'storage/themes/winter.png',
                'type' => 'Premium',
            ),
            array(
                'name' => 'Lumen',
                'background' => "
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FFFFFF;
                    border-radius: 8px;
                    box-shadow: 0px 6px 14px -6px rgb(24 39 75 / 12%), 0px 10px 32px -4px rgb(24 39 75 / 10%), inset 0px 0px 2px 1px rgb(24 39 75 / 5%);
                ',
                'font_family' => "'Inter', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/lumen.png',
                'bg_image' => 'storage/themes/lumen.jpg',
                'type' => 'Premium',
            ),
            array(
                'name' => 'Grey Mix',
                'background' => "
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FFFFFF;
                    border-radius: 8px;
                    box-shadow: 0px 6px 14px -6px rgb(24 39 75 / 12%), 0px 10px 32px -4px rgb(24 39 75 / 10%), inset 0px 0px 2px 1px rgb(24 39 75 / 5%);
                ',
                'font_family' => "'Inter', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/grey-mix.png',
                'bg_image' => 'storage/themes/greyky.jpg',
                'type' => 'Premium',
            ),
            array(
                'name' => 'Rainy Night',
                'background' => "
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                ",
                'text_color' => '#FFFFFF',
                'button_style' => '
                    border-radius: 30px;
                    background: rgba(255, 255, 255, 0.075);
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/rainy-night.png',
                'bg_image' => 'storage/themes/rainy_night.jpg',
                'type' => 'Premium',
            ),
            array(
                'name' => 'Neon',
                'background' => "
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                ",
                'text_color' => '#FFFFFF',
                'button_style' => '
                    border-radius: 30px;
                    background: rgba(196, 196, 196, 0.01);
                    box-shadow: inset 0px 17.7895px 25.5438px -16.421px rgb(255 255 255 / 50%), inset 0px -5.92982px 4.10526px -6.38596px rgb(255 255 255 / 75%), inset 0px 3.19298px 5.01754px -1.82456px #ffffff, inset 0px -37.4035px 31.0175px -29.193px rgb(96 68 145 / 30%), inset 0px 44.7017px 45.614px -21.8947px rgb(202 172 255 / 30%), inset 0px 1.82456px 8.21052px rgb(154 146 210 / 30%), inset 0px 0.45614px 18.2456px rgb(227 222 255 / 20%);
                    backdrop-filter: blur(45.614px);
                ',
                'font_family' => "'Bebas Neue', cursive",
                'theme_demo' => 'storage/themes/theme-demo/neon.png',
                'bg_image' => 'storage/themes/neon.jpg',
                'type' => 'Premium',
            ),
            array(
                'name' => 'Glassy',
                'background' => "
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    border-radius: 30px;
                    border: 1px solid rgba(255,255,255,0.3);
                    background: linear-gradient(263.81deg, rgba(255, 255, 255, 0.4) 18.8%, rgba(255, 255, 255, 0) 73.34%), rgba(255, 255, 255, 0.25);
                    box-shadow: 0px 1px 2px rgb(0 0 0 / 3%), inset -1px -0.5px 2px rgb(255 255 255 / 40%);
                    backdrop-filter: blur(12px);
                ',
                'font_family' => "'Poppins', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/glassy.png',
                'bg_image' => 'storage/themes/glassmorphism.jpg',
                'type' => 'Premium',
            ),
            array(
                'name' => 'Desert',
                'background' => "
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FFFFFF;
                    border-radius: 4px;
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/desert.png',
                'bg_image' => 'storage/themes/desert.jpg',
                'type' => 'Premium',
            ),
            array(
                'name' => 'Bloody',
                'background' => "
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                ",
                'text_color' => '#1d2939',
                'button_style' => '
                    background: #FFFFFF;
                    border-radius: 4px;
                ',
                'font_family' => "'DM Sans', sans-serif",
                'theme_demo' => 'storage/themes/theme-demo/bloody.png',
                'bg_image' => 'storage/themes/bloody.jpg',
                'type' => 'Premium',
            ),
        );

        // insert theme in the database
        foreach ($themes as $theme) {
            Theme::create([
                'name' => $theme['name'],
                'background' => $theme['background'],
                'text_color' => $theme['text_color'],
                'button_style' => $theme['button_style'],
                'font_family' => $theme['font_family'],
                'theme_demo' => $theme['theme_demo'],
                'bg_image' => $theme['bg_image'],
                'type' => $theme['type'],
            ]);
        }
    }
}
