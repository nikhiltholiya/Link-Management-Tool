<?php

namespace Database\Seeders;

use App\Models\AppSection;
use Illuminate\Database\Seeder;

class IntroSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $appSections = array(
            [
                'name' => 'Header',
                'title' => 'The One Link for All Your Links',
                'description' => null,
                'thumbnail' => 'storage/themes/theme-group2.png',
                'section_list' => '[
                    {"content": "Free Link", "icon": "link", "url": null},
                    {"content": "Premium Link", "icon": "premium", "url": null},
                    {"content": "QR Code Generate", "icon": "qrcode", "url": null},
                    {"content": "Url Shortener", "icon": "link-slash", "url": null}
                ]',
            ],
            [
                'name' => 'Features',
                'title' => 'Features',
                'description' => null,
                'thumbnail' => null,
                'section_list' => '[
                    {"content": "Url Shortener", "icon": "link-slash", "url": null},
                    {"content": "19+ Themes", "icon": "palette", "url": null},
                    {"content": "Visitor Status Tracking", "icon": "chart-line-up", "url": null},
                    {"content": "Full Customizing Option", "icon": "fill-drip", "url": null}
                ]',
            ],
            [
                'name' => 'Create Link',
                'title' => 'Create Link with a great form',
                'description' => 'Create your own unique link and take your like wherever your audience is to help them to discover all your important content.',
                'thumbnail' => 'assets/create-link.svg',
                'section_list' => '[
                    {"content": "Custom colors", "icon": "double-check", "url": null},
                    {"content": "Customize settings or drag-and-drop", "icon": "double-check", "url": null},
                    {"content": "19+ Themes", "icon": "double-check", "url": null},
                    {"content": "Customize settings or drag-end-drop", "icon": "double-check", "url": null}
                ]',
            ],
            [
                'name' => 'Add Blocks',
                'title' => 'Add Blocks',
                'description' => 'Yes! you can use Block, drag-and-drop to set up your link customizable.',
                'thumbnail' => 'assets/blocks.svg',
                'section_list' => '[
                    {"content":"Custom colors", "icon": "double-check", "url": null},
                    {"content":"Customize settings or drag-and-drop", "icon": "double-check", "url": null},
                    {"content":"19+ Themes", "icon": "double-check", "url": null},
                    {"content":"Customize settings or drag-end-drop", "icon": "double-check", "url": null}
                ]',
            ],
            [
                'name' => 'QR Codes',
                'title' => 'Create QR Codes',
                'description' => 'Create your own unique link and take your like wherever your audience is to help them to discover all your important content.',
                'thumbnail' => 'assets/qr-code.svg',
                'section_list' => '[
                    {"content":"Custom colors", "icon": "double-check", "url": null},
                    {"content":"Customize settings or drag-and-drop", "icon": "double-check", "url": null},
                    {"content":"19+ Themes", "icon": "double-check", "url": null},
                    {"content":"Customize settings or drag-end-drop", "icon": "double-check", "url": null}
                ]',
            ],
            [
                'name' => 'Follow On',
                'title' => 'Follow on:',
                'description' => null,
                'thumbnail' => null,
                'section_list' => '[
                    {"content": null, "icon": "twitter", "url": "https://twitter.com"},
                    {"content": null, "icon": "linkedin", "url": "https://linkedin.com"},
                    {"content": null, "icon": "facebook", "url": "https://facebook.com"},
                    {"content": null, "icon": "youtube", "url": "https://youtube.com"}
                ]',
            ],
            [
                'name' => 'Support',
                'title' => 'Support',
                'description' => null,
                'thumbnail' => null,
                'section_list' => '[
                    {"content": "Help", "icon": null, "url": "#"},
                    {"content": "Getting Started", "icon": null, "url": "#"},
                    {"content": "FAQs", "icon": null, "url": "#"},
                    {"content": "Privacy Policy", "icon": null, "url": "#"},
                    {"content": "Terms & Conditions", "icon": null, "url": "#"}
                ]',
            ],
            [
                'name' => 'Address',
                'title' => 'Address',
                'description' => null,
                'thumbnail' => null,
                'section_list' => '[
                    {"content": "18, Time squar, California United State of America.", "icon": null, "url": null},
                    {"content": "+(123) 456 789 10", "icon": null, "url": null},
                    {"content": "info@biolink.com", "icon": null, "url": null},
                    {"content": "www.biolink.com", "icon": null, "url": null}
                ]',
            ],
        );

        foreach ($appSections as $value1) {
            AppSection::create([
                'name' => $value1['name'],
                'title' => $value1['title'],
                'description' => $value1['description'],
                'thumbnail' => $value1['thumbnail'],
                'section_list' => $value1['section_list']
            ]);
        }
    }
}
