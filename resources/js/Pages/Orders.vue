<template>
    <div class="orders">
        <h1 class="text-h4 pa-md-4 ma-md-4">Orders</h1> 

          <!-- {{ $log("getOrders "+getOrders) }}  -->

        <!-- <table class="table-fixed w-full">

            <thead>
                <th class="w-1/12 content-center text-center">id</th>
                <th class="w-3/12">name</th>
                <th class="w-1/12 text-center">weight</th>
                <th class="w-5/12">description</th>
                <th class="w-1/12 text-center">price</th>
            </thead>

        <tbody v-for="order in orders" :key="order.id" >

        <tr>
            <td class="w-1/12 content-center text-center"> {{ order.id }} </td>
            <td class="w-3/12 p-2"> {{ order.product_name }} </td>
            <td class="w-1/12 text-center"> {{ order.weight }}</td>
            <td class="w-5/12 p-2"> {{ order.description }}</td>
            <td class="w-1/12 text-center"> {{ order.total_price }}</td>
        </tr>

        </tbody>

        </table>

     <div class="pagination">
        <ul class="pagination_list">
            <li><a href="#" @click="Orders(pagination.firstPage)">first</a></li>
            <li><a href="#" @click="Orders(pagination.nextPage)">prev</a></li>
            <li class="pagination_pages"><a href="#" :key="n" v-for="n in pagination_links" @click="Orders(n.url)" :class="{ active: isPageActive(n.active) }">{{n.label}}</a></li>
            <li><a href="#" @click="Orders(pagination.prevPage)">next</a></li>
            <li><a href="#" @click="Orders(pagination.lastPage)">last</a></li>
        </ul>
        <div class="pagination_info">Orders {{pagination.fromPage}} - {{pagination.toPage}} from {{pagination.totalItem}}</div>
    </div>   -->


        <!-- <pagination></pagination> -->
        <router-view></router-view>
    </div>

    <v-app id="inspire">

  <v-table>
    <thead>
      <tr>
        <th class="text-left">id</th>
        <th class="text-left">product name</th>
        <th class="text-left">weight</th>
        <th class="text-left">description</th>
        <th class="text-left">price</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="order in orders"
        :key="order.id"
      >
        <td>{{ order.id }}</td>
        <td>{{ order.product_name }}</td>
        <td>{{ order.weight }}</td>
        <td>{{ order.description }}</td>
        <td>{{ order.total_price }}</td>
        <td>
        <v-icon
        small
        class="mr-2"
        @click="editItem(order)"
        >
        mdi-pencil
        </v-icon>

        </td>
        <td>
        <v-icon
        small
        @click="deleteItem(order)"
      > 
        mdi-delete
      </v-icon></td>
      </tr>
    </tbody>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
        <v-card>
        <v-card-text>
           Edit product
        </v-card-text>

            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="editedOrder.product_name" label="" :model-value="editedOrder.product_name"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="editedOrder.weight"  laeditedOrderbel="" :model-value="editedOrder.weight" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="editedOrder.total_price"  label="" :model-value="editedOrder.total_price"
                            required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-textarea v-model="editedOrder.description"  label="" :model-value="editedOrder.description"
                            required></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-btn color="success" class="me-4" @click="editOrdersFormSubmit()">Save</v-btn>
                    </v-col>
                    <v-col cols="12" md="6" class="text-right ">
                        <v-btn color="info" class="me-4" @click="dialog = false">Close</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
      </v-dialog>

  </v-table>



  <div class="text-center pa-md-4 ma-md-4">
    <v-pagination
      v-model="pagination_current_page"
      :length="pagination_pages"
      :show-first-last-page="true"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      @update:modelValue="nextPage($event, pageSizeNum)"
    ></v-pagination>
  </div>

 

  </v-app>

</template>

<script>

//import Pagination from '../Components/Pagination.vue';

import { ref, onMounted, computed } from 'vue';

import { useStore, mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
    
data(){
    return {

        orders: [],
        pagination: {},
        pagination_links: [],
        pagination_current_page: 1,
        pagination_pages: 1,
        tbl_headers: [
        {text: 'id', align: 'start', sortable: false, value: 'id'},
        {text: 'product name', align: 'start', sortable: true, value: 'name'},
        {text: 'weight', align: 'start', sortable: true, value: 'weigth'},
        {text: 'description', align: 'start', sortable: false, value: 'description'},
        {text: 'price', align: 'start', sortable: true, value: 'price'},
        ],
        dialog: false,
        editedIndex: -1,
        deletedIndex: -1,
        editedOrder: {}
        
    };
},
mounted(){

    this.Orders();

},
computed: {

},
methods: {

   async Orders(link){
    await this.$store.dispatch('fetchOrders', link);
    this.orders = this.$store.getters.getOrders;
    this.pagination = this.$store.getters.getPagination;
    this.pagination_links = this.pagination.links;
    this.pagination_links.shift();
    this.pagination_links.pop();
    this.pagination_current_page = this.pagination.currentPageNumber;
    this.pagination_pages = this.pagination.totalItem/this.pagination.perPage;
   },

   isPageActive(active) {
      return active === true;
    },

    nextPage(page){


      for(let i=0; i<= this.pagination_links.length; i++){
        if(i == page-1){
            this.Orders(this.pagination_links[i].url);
        }
      }

    },

    editItem(order){
        this.editedIndex = this.orders.indexOf(order);
        this.editedOrder = order;
        this.dialog = true;
       // console.table("this.editedIndex "+this.editedIndex);
    }, 

    editOrdersFormSubmit(){
        
        if (this.editedIndex > -1) {
          Object.assign(this.orders[this.editedIndex], this.editedOrder)
        } else {
          this.orders.push(editedOrder)
        }
        this.dialog = false;
        
        // console.table(editedOrder);
        // console.table(this.orders);
    },

    deleteItem(order){
        this.deletedIndex = this.orders.indexOf(order);
        delete this.orders[this.deletedIndex];
        this.orders.splice(this.deletedIndex, 1);
        // console.log("deleted item index: "+this.deletedIndex);  
        // console.table(this.orders);
    },


},
created (){
  
},
watch: {
    "pagination_current_page": (newPage) => {},

}

};

</script>
