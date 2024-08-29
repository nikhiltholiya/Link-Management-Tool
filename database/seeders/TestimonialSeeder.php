<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $testimonials = array(
            array(
                'name' => 'Poul Josefsen',
                'title' => 'Service Engineer, Amazon',
                'thumbnail' => 'storage/testimonials/customer-2.png',
                'testimonial' => "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites.",
            ),
            array(
                'name' => 'Karl Jensen',
                'title' => 'Manager, Olex',
                'thumbnail' => 'storage/testimonials/customer-1.png',
                'testimonial' => "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites.",
            ),
            array(
                'name' => 'Malik Lyberth',
                'title' => 'Product Designer, Apple',
                'thumbnail' => 'storage/testimonials/customer-3.png',
                'testimonial' => "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to work with you. It's really great how easy your websites.",
            ),
        );

        foreach ($testimonials as $item) {
            Testimonial::create([
                'name' => $item['name'],
                'title' => $item['title'],
                'thumbnail' => $item['thumbnail'],
                'testimonial' => $item['testimonial'],
            ]);
        }
    }
}
