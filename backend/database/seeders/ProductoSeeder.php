<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('productos')->insert([
            [
                'nombre' => 'Laptop Lenovo',
                'descripcion' => 'Laptop para oficina',
                'precio' => 5500.00,
                'stock' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Monitor Samsung',
                'descripcion' => 'Monitor 24 pulgadas',
                'precio' => 1200.00,
                'stock' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Teclado Mecánico',
                'descripcion' => 'Teclado RGB',
                'precio' => 450.00,
                'stock' => 35,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
