import { createStore } from 'vuex';
import axios from 'axios';
import * as microserviceConfigDev from  '../env.microservicesDev.js';
import * as microserviceConfigProd from  '../env.microservicesProd.js';

let microserviceConfig = '';
if(import.meta.env.VITE_APP_ENV == 'local1'){
    const microserviceConfig = microserviceConfigDev;

}else{
    const microserviceConfig = microserviceConfigProd;
}


export default createStore({
    store: {
        orders: [], // all orders
        order: {}, // updated or deleted order from API
        pagination: {}, // pagination data
        responseStatus: 0, 
        updateOrderMessage: '', // message from API if order updating success
        updateOrderError: '', // message from API if order updating fail
        addOrderMessage: '', // message from API if order added success
        addOrderError: '', // message from API if order added fail
        deleteOrderMessage: '', // message from API if order deleted success
        deleteOrderError: '', // message from API if order deleted fail
    },
    getters: {
   
        getOrders: (state) => state.orders,
        getOrder: (state) => state.order,
        getPagination: (state) => state.pagination,
        getUpdateOrderMessage: (state) => state.updateOrderMessage,
        getUpdateOrderError: (state) => state.updateOrderError,
        getResponseStatus: (state) => state.responseStatus,
        getDeleteOrderMessage: (state) => state.deleteOrderMessage,
        getDeleteOrderError: (state) => state.deleteOrderError,
        getAddOrderMessage: (state) => state.addOrderMessage,
        getAddOrderError: (state) => state.addOrderError,

    }, 
    actions: {

        async storeNewOrder({ commit }, order, link = "api/orders/create"){

            if(microserviceConfig.VITE_MICROSERVICE_ORDERS_USE == 'true'){  
                link = microserviceConfig.VITE_MICROSERVICE_ORDERS_URL+"/"+link
            }

            await axios.post(link, order) 
            .then(response => {
                if(response.status == 200){
                    commit("SET_ADD_ORDER" , response.data.data.message);
                    commit("SET_ORDER", response.data.data.order);
                }
                    commit("SET_RESPONSE_STATUS", response.status);
            })
            .catch((e) => {
                console.log(e);
                commit("SET_ADD_ORDER_ERROR", e.response.data.error);
                commit("SET_RESPONSE_STATUS", e.response.status);
            });

        },

        async deleteOrder({ commit }, order, link = "api/orders/delete"){

            if(microserviceConfig.VITE_MICROSERVICE_ORDERS_USE == 'true'){  
                link = microserviceConfig.VITE_MICROSERVICE_ORDERS_URL+"/"+link
            }

            await axios.delete(link, {
                data: { 
                    id: order.id
                }
            }) 
            .then(response => {
                if(response.status == 200){
                    commit("SET_DELETE_ORDER" , response.data.data.message);
                    
                }
                commit("SET_RESPONSE_STATUS", response.status);
            })
            .catch((e) => {
                console.log(e);
                commit("SET_DELETE_ORDER_ERROR", e.response.data.error);
                commit("SET_RESPONSE_STATUS", e.response.status);
            });
        },
        
        async storeEditOrder({ commit }, order, link = "api/orders/update"){

            if(microserviceConfig.VITE_MICROSERVICE_ORDERS_USE == 'true'){  
                link = microserviceConfig.VITE_MICROSERVICE_ORDERS_URL+"/"+link
            }

            await axios.post(link, order)
            .then(response => {
                
                if(response.status == 200){
                  commit("SET_UPDATE_ORDER", response.data.data.message);
                  commit("SET_ORDER", response.data.data.order);
                }
                  commit("SET_RESPONSE_STATUS", response.status);
                  
            })
            .catch((e) => {
               console.log(e);
               commit("SET_UPDATE_ORDER_ERROR", e.response.data.error);
               commit("SET_RESPONSE_STATUS", e.response.status);
            });
        },

        async fetchOrders({ commit }, link = "api/orders?page=1") {
             
          
            if(microserviceConfig.VITE_MICROSERVICE_ORDERS_USE == 'true'){  
                link = microserviceConfig.VITE_MICROSERVICE_ORDERS_URL+"/"+link
            }

            await axios.get(link+"&limit=20")
            .then(response => {
              
              commit("SET_ORDERS", response.data.data.data);

              commit("SET_PAGINATION", {
                firstPage: response.data.data.first_page_url,
                currentPage: response.data.data.first_page_url,
                currentPageNumber: response.data.data.current_page,
                perPage: response.data.data.per_page,
                path: response.data.data.path + "?page=",
                fromPage: response.data.data.from,
                toPage: response.data.data.to,
                nextPage: response.data.data.next_page_url,
                prevPage: response.data.data.prev_page_url,
                lastPage: response.data.data.last_page,
                links: response.data.data.links,
                totalItem: response.data.data.total,
            });
        })
        .catch((e) => {
            console.log(e);
        });
           
        },
    },
    mutations: {

        SET_ORDERS(state, orders) {
            state.orders = orders;
        },  
        SET_ORDER(state, order){
            state.order = order;
        },
        SET_PAGINATION(state, pagination){
            state.pagination = pagination;
        },
        SET_UPDATE_ORDER(state, updateOrderMessage){
            state.updateOrderMessage = updateOrderMessage;
        },
        SET_UPDATE_ORDER_ERROR(state, updateOrderError){
            state.updateOrderError  = updateOrderError; 
        },
        SET_RESPONSE_STATUS(state, responseStatus){
           state.responseStatus = responseStatus;
        },
        SET_DELETE_ORDER(state, deleteOrderMessage){
            state.deleteOrderMessage = deleteOrderMessage;
        },
        SET_DELETE_ORDER_ERROR(state, deleteOrderError){
            state.deleteOrderError = deleteOrderError;
        },
        SET_ADD_ORDER(state, addOrderMessage){
            state.addOrderMessage = addOrderMessage;
        },
        SET_ADD_ORDER_ERROR(state, addOrderError){
            state.addOrderError = addOrderError;
        },
    },
});
