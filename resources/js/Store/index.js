import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    store: {
        orders: [],
        pagination: {}
    },
    getters: {

        getOrders: (state) => state.orders,
        getPagination: (state) => state.pagination

    },
    actions: {
        async fetchOrders({ commit }, link = "api/orders?page=1") {
            
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
        
        SET_PAGINATION(state, pagination){
            state.pagination = pagination;
        },

    },
});
