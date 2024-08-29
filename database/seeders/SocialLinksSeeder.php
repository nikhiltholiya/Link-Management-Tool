<?php

namespace Database\Seeders;

use App\Models\SocialLinks;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SocialLinksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $socialLinks = array(
            array(
                'name'=>'Email',
                'icon'=>'fa-solid fa-circle-envelope',
                'linkType'=>'socialEmail',
                'placeholder'=>'example@gmail.com',
            ),
            array(
                'name'=>'Telephone',
                'icon'=>'fa-solid fa-circle-phone',
                'linkType'=>'socialEelephone',
                'placeholder'=>'+00000000000',
            ),
            array(
                'name'=>'Telegram',
                'icon'=>'fa-brands fa-telegram',
                'linkType'=>'socialTelegram',
                'placeholder'=>'https://t.me/username',
            ),
            array(
                'name'=>'Whatsapp',
                'icon'=>'fa-brands fa-whatsapp-square',
                'linkType'=>'socialWhatsapp',
                'placeholder'=>'+00000000000',
            ),
            array(
                'name'=>'Facebook',
                'icon'=>'fa-brands fa-facebook',
                'linkType'=>'socialFacebook',
                'placeholder'=>'https://facebook.com/username',
            ),
            array(
                'name'=>'Messenger',
                'icon'=>'fa-brands fa-facebook-messenger',
                'linkType'=>'socialMessenger',
                'placeholder'=>'https://m.me/',
            ),
            array(
                'name'=>'Instagram',
                'icon'=>'fa-brands fa-instagram-square',
                'linkType'=>'socialInstagram',
                'placeholder'=>'https://instagram.com/',
            ),
            array(
                'name'=>'Twitter',
                'icon'=>'fa-brands fa-twitter-square',
                'linkType'=>'socialTwitter',
                'placeholder'=>'https://twitter.com/',
            ),
            array(
                'name'=>'TikTok',
                'icon'=>'fa-brands fa-tiktok',
                'linkType'=>'socialTikTok',
                'placeholder'=>'https://tiktok.com/@username',
            ),
            array(
                'name'=>'YouTube',
                'icon'=>'fa-brands fa-youtube',
                'linkType'=>'socialYouTube',
                'placeholder'=>'https://youtube.com/channel/channelid',
            ),
            array(
                'name'=>'SoundCloud',
                'icon'=>'fa-brands fa-soundcloud',
                'linkType'=>'socialSoundCloud',
                'placeholder'=>'https://soundcloud.com/username',
            ),
            array(
                'name'=>'LinkedIn',
                'icon'=>'fa-brands fa-linkedin',
                'linkType'=>'socialLinkedIn',
                'placeholder'=>'https://linkedin.com/profle',
            ),
            array(
                'name'=>'Spotify',
                'icon'=>'fa-brands fa-spotify',
                'linkType'=>'socialSpotify',
                'placeholder'=>'https://open.spotify.com/artist/username',
            ),
            array(
                'name'=>'Pinterest',
                'icon'=>'fa-brands fa-pinterest',
                'linkType'=>'socialPinterest',
                'placeholder'=>'https://pinterest.com/username',
            ),
            array(
                'name'=>'Snapchat',
                'icon'=>'fa-brands fa-snapchat-square',
                'linkType'=>'socialSnapchat',
                'placeholder'=>'https://snapchat.com/add/username',
            ),
            array(
                'name'=>'Discord',
                'icon'=>'fa-brands fa-discord',
                'linkType'=>'socialDiscord',
                'placeholder'=>'https://discord.gg/username',
            ),
        );

        foreach($socialLinks as $link){
            SocialLinks::create([
                'name' => $link['name'],
                'icon' => $link['icon'],
                'linkType' => $link['linkType'],
                'placeholder' => $link['placeholder'],
            ]);
        }
    }
}
