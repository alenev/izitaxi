<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\\Orders>
 */
class OrdersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $faker = app(Generator::class);

        return [
            'product_name' => $faker->sentence(3),
            'weight' => $faker->randomFloat(1, 1, 5),
            'description' => $faker->sentence(20),
            'total_price' => $faker->randomFloat(0,100,1000),
            ];

    }
}
