#Установка и настройка:
 
- установка пакетов Laravel (composer install)
- установка node-modules (npm install)
- подключение к БД (сеттинг в файле конфига .env)
- миграция структуры БД (php artisan migrate)
- заполнение таблицы ордеров тестовыми данными (php artisan db:seed --class=OrdersSeeder)
- запуск development-среды (npm run dev) В .htaccess настроен редирект на папку /public. 
- app фронтенда на Vue/Vuex/Vuetify реализован в базовом шаблоне Laravel resources\views\welcome.blade.php
- в routes\web.php настроена обработка всех роутов фронтенда через app  
