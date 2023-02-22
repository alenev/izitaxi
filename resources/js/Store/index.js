import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    data(){
       return {        
       }
    },
    state: {
    },
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
        ordersSrc: 'local'
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
        getOrdersSrc: (state) => state.ordersSrc

    },
    methods:{

    },
    actions: {

        commitOrdersSrc({commit}, ordersSrc){
            commit('SET_ORDERS_SRC', ordersSrc);
        },

        async storeNewOrder({ commit }, params) {

            await axios.post(params.link, params.order)
                .then(response => {
                    if (response.status == 200) {
                        commit("SET_ADD_ORDER", response.data.data.message);
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

        async deleteOrder({ commit }, params) {

            await axios.delete(params.link, {
                data: {
                    id: params.order.id
                }
            })
                .then(response => {
                    if (response.status == 200) {
                        commit("SET_DELETE_ORDER", response.data.data.message);

                    }
                    commit("SET_RESPONSE_STATUS", response.status);
                })
                .catch((e) => {
                    console.log(e);
                    commit("SET_DELETE_ORDER_ERROR", e.response.data.error);
                    commit("SET_RESPONSE_STATUS", e.response.status);
                });
        },

        async storeEditOrder({ commit }, params) {
            console.log('params: '+params);
            await axios.post(params.link, params.order)
                .then(response => {

                    if (response.status == 200) {
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

        async fetchOrders({ commit }, link) {
            

            await axios.get(link)
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
        SET_ORDER(state, order) {
            state.order = order;
        },
        SET_PAGINATION(state, pagination) {
            state.pagination = pagination;
        },
        SET_UPDATE_ORDER(state, updateOrderMessage) {
            state.updateOrderMessage = updateOrderMessage;
        },
        SET_UPDATE_ORDER_ERROR(state, updateOrderError) {
            state.updateOrderError = updateOrderError;
        },
        SET_RESPONSE_STATUS(state, responseStatus) {
            state.responseStatus = responseStatus;
        },
        SET_DELETE_ORDER(state, deleteOrderMessage) {
            state.deleteOrderMessage = deleteOrderMessage;
        },
        SET_DELETE_ORDER_ERROR(state, deleteOrderError) {
            state.deleteOrderError = deleteOrderError;
        },
        SET_ADD_ORDER(state, addOrderMessage) {
            state.addOrderMessage = addOrderMessage;
        },
        SET_ADD_ORDER_ERROR(state, addOrderError) {
            state.addOrderError = addOrderError;
        },
        SET_ORDERS_SRC(state, ordersSrc){
            state.ordersSrc = ordersSrc;
        }
    },
});
