# LaravelVueVuexVuetifyOrdersCRUD
 
## CRUD app with backend on Laravel 9 and SPA frontend on Vue/Vuex/Vuetify. Optionaly connection for CRUD operation to [microsrvice on Lumen](https://github.com/alenev/LaravelVueVuexVuetifyOrdersCRUDLumenOrdersMicroservice). 

## [demo](http://orders-crud.alenev.name)


##### Front-end
- This app has a paginated order table in the /orders route that displays all orders from the database order table;
- Orders table UI realized on Vuetify material UI;
- Orders UI have edit existing order and create new order modal windows;
- In the create/edit orders form exist dynamic validation of form fields;
- Orders data on Front-end process by the Vuex store and connects to the Back-end by axios in the Vuex store;
- Orders UI have checkbox 'orders from microservice'. With this option CRUD use connection to outside API in microservice on Lumen for all CRUD operations with orders. Microservice and app use same DB.

##### Back-end
- For CRUD operations of the Front-end REST-API of Back-end has points with routes 'orders' (GET), 'orders/create' (POST), 'orders/update' (POST), 'orders/delete' (DELETE); 
- REST-API points for orders in controller methods have validation is used through separately created request handlers ```app\Http\Requests\OrdersRequest.php``` and ```app\Http\Requests\DeleteRequest.php```;
- Orders controller methods use  ```app\Repositories\OrdersRepository.php``` with Eloquent ORM as orders model;
-  In main controller app\Http\Controllers\Controller.php created methods ```ApiResponceSuccess``` and ```ApiResponceError``` for unification API responses of controllers methods;

## Installation and configuration:

- installing Laravel packages `composer install`
- installing node-modules `npm install`
- connecting to the database (setting in the configuration file .env)
- database structure migration `php artisan migrate`
- filling the order table with test data `php artisan db:seed --class=OrdersSeeder`
- start development-environment `npm run dev` In .htaccess configured redirect to the folder /public. To render an app from a static build to production, the build is done using `npm run build`
- the frontend app on Vue/Vuex/Vuetify is implemented in the basic Laravel template resources\views\welcome.blade.php
- in routes\web.php configured processing of all frontend routes through the app
- in config .github/workflows/sshdeploy.yml you can find settings for CI/CD from localhost to VPS
