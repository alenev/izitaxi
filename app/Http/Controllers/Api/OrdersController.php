<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\OrdersRequest;
use App\Http\Requests\DeleteRequest;
use App\Models\Orders;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Helpers\Api\DataHelper;

class OrdersController extends Controller
{
    public object $orders;
    private object $order;
    private array $orderData;
    private $requestValidateError;


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request):JsonResponse
    {

          $orders = DB::table('orders')->paginate($perPage = $request['limit']);

          return Controller::ApiResponceSuccess($orders, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrdersRequest $request):JsonResponse
    {

        $this->requestValidateError = DataHelper::requestValidationErrorsData($request);

        if ($this->requestValidateError) { 
 
            return Controller::ApiResponceError($this->requestValidateError, 500); 
  
         }

        $this->orderData = DataHelper::orderDataTransform($request->all());

        $id = Orders::create($this->orderData);

        if($id){
            $this->show($id);
            return Controller::ApiResponceSuccess([
                "message" => "order created",
                "order" => $this->order
            ], 200); 

        }else{

            return Controller::ApiResponceError("order update error", 500);

        }
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->order = Orders::find($id)->first();

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(OrdersRequest $request):JsonResponse
    {
        $this->requestValidateError = DataHelper::requestValidationErrorsData($request);

        if ($this->requestValidateError) { 
 
            return Controller::ApiResponceError($this->requestValidateError, 500); 
  
         }
          
           $this->show($request['id']);
           $this->orderData = DataHelper::orderDataTransform($request->all());

           if($this->order->update($this->orderData)){
              $this->show($request['id']);
              return Controller::ApiResponceSuccess([
                "message" => "order updated",
                "order" => $this->order

            ], 200); 

           }else{

              return Controller::ApiResponceError("order update error", 500);

           }
         
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id):bool
    {

       $delete = Orders::find($id)->delete();

       return $delete;
       
    }

    public function deleteOrder(DeleteRequest $request):JsonResponse
    {
        $this->requestValidateError = DataHelper::requestValidationErrorsData($request);

        if ($this->requestValidateError) { 
 
            return Controller::ApiResponceError($this->requestValidateError, 500); 
  
         }

        if($this->destroy($request["id"])){

            return Controller::ApiResponceSuccess(["message" => "order deleted"], 200); 

         }else{

            return Controller::ApiResponceError("order delete error", 500);

         }
    }
}