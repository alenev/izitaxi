#Встановлення і налаштування:
 
- встановлення пакетів Laravel (composer install)
- встановлення node-modules (npm install)
- підключення до БД (сеттінг в файлі конфигу .env)
- міграція структури БД (php artisan migrate)
- заповнення таблиці ордерів тестовими даними (php artisan db:seed --class=OrdersSeeder)
- запуск development-середовища (npm run dev) В .htaccess налаштований редірект на папку /public. 
- app фронтенду на Vue/Vuex/Vuetify реалізований в базовому шаблоні Laravel resources\views\welcome.blade.php
- в routes\web.php налаштована обробка всіх роутів фронтенду через app  
