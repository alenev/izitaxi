# LaravelVueVuexVuetifyOrdersCRUD
 
## CRUD app with backend on Laravel 9 and SPA frontend on Vue/Vuex/Vuetify

## [demo](http://orders-crud.alenev.name)


##### Frontend
- This app has a paginated order table in the /orders route that displays all orders from the database order table;
- It is possible to edit an existing order or add a new order in the modal window;
- In the form of adding/editing orders, validation of form fields is configured;
- The frontend processes order data via the Vuex store and connects to the backend using axios in the Vuex store.

##### Backend
- For CRUD operations of the frontend, separate REST-API points orders, orders/create, orders/update, orders/delete have been created in the backend;
- In the REST-API points, request validation is used through separately created request validation handlers; 

## Installation and configuration:

- installing Laravel packages `composer install`
- installing node-modules `npm install`
- connecting to the database (setting in the configuration file .env)
- database structure migration `php artisan migrate`
- filling the order table with test data `php artisan db:seed --class=OrdersSeeder`
- start development-environment `npm run dev` In .htaccess configured redirect to the folder /public. To render an app from a static build to production, the build is done using `npm run build`
- the frontend app on Vue/Vuex/Vuetify is implemented in the basic Laravel template resources\views\welcome.blade.php
- in routes\web.php configured processing of all frontend routes through the app
