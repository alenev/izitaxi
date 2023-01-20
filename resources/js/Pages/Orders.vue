<template>
 

<v-app id="inspire">
<h1 class="text-h4 pa-md-4 ma-md-4">Orders</h1> 
<v-header>
    <div class="text-right pa-md-4">
        <v-btn @click="newItem()" color="primary" rounded="pill">
           New Order
        </v-btn>
    </div>
</v-header>
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

    <v-dialog v-model="dialog_message" transition="dialog-bottom-transition" class="w-50">
        <v-card>
            <v-container>
                <v-card-text cols="12" md="12" class="text-center ">
                    {{ dialogMessageText }}
                </v-card-text>
    
    
                <v-col cols="12" md="12" class="text-center">
                    <v-btn color="info" class="me-4" @click="dialog_message = false">Close</v-btn>
                </v-col>
            </v-container>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
        <v-card>
        <v-card-text class="text-h4">
           {{ product_modal_form_title }}
        </v-card-text>
  
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field class="text-body-1" v-model="editedOrder.product_name" :label="orderTemplateLabels.product_name" :model-value="editedOrder.product_name"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field class="text-body-1" v-model="editedOrder.weight"  :label="orderTemplateLabels.weight" :model-value="editedOrder.weight" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field class="text-body-1" v-model="editedOrder.total_price"  :label="orderTemplateLabels.total_price" :model-value="editedOrder.total_price"
                            required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-textarea class="text-body-1" v-model="editedOrder.description"  :label="orderTemplateLabels.description" :model-value="editedOrder.description"
                            required></v-textarea>
                    </v-col>
                </v-row>
                <v-row class="pa-4">
                    <v-col cols="12" md="6">
                        <v-btn color="warning" class="me-4" @click="editOrdersFormSubmit()">Save</v-btn>
                    </v-col>
                    <v-col cols="12" md="6" class="text-right">
                        <v-btn color="primary" class="me-4" @click="dialog = false">Close</v-btn>
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

    <!-- {{ $log("getOrders "+getOrders) }}  -->
    <!-- <pagination></pagination> -->
    <router-view></router-view>

</template>

<script>

//import Pagination from '../Components/Pagination.vue';

import { ref, onMounted, computed } from 'vue';

import { useStore, mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
    
data(){
    return {

        orders: [],
        order: {},
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
        dialog_message: false,
        dialogMessageText: '',
        editedIndex: -1,
        deletedIndex: -1,
        editedOrder: {}, 
        updateOrderMessage: '',
        updateOrderError: '',
        addOrderMessage: '',
        addOrderError: '',
        deleteOrderMessage: '',
        deleteOrderError: '',
        responseStatus: 0, 
        product_modal_form_title: '',
        orderTemplateLabels: {
            'product_name': 'product_name',
            'weight': 'weight',
            'description': 'description',
            'total_price': 'total_price'
        },
     
    };
},
mounted(){

    this.Orders();

},
computed: {

},
methods: {

   async storeOrder(order){


    if(order.id > 0){

        await this.$store.dispatch('storeEditOrder', order);
        this.updateOrderMessage = this.$store.getters.getUpdateOrderMessage;
        this.updateOrderError = this.$store.getters.getUpdateOrderError;
        this.responseStatus = this.$store.getters.getResponseStatus;
        if(this.responseStatus == 200){
          this.order = this.$store.getters.getOrder;
          Object.assign(this.orders[this.editedIndex], this.order);
          this.showDialogMessage(this.updateOrderMessage);         
        }else{
          this.showDialogMessage(this.updateOrderError);
        }
        this.editedIndex = -1;
    }else{
        order.id = 0;
        await this.$store.dispatch('storeNewOrder', order);
        this.addOrderMessage = this.$store.getters.getAddOrderMessage;
        this.addOrderError = this.$store.getters.getAddOrderError;
        this.responseStatus = this.$store.getters.getResponseStatus;
        if(this.responseStatus == 200){
          this.order = this.$store.getters.getOrder;
          this.orders.unshift(this.order); 
          this.showDialogMessage(this.addOrderMessage);
          this.editedOrder = {};
        }else{
          this.showDialogMessage(this.addOrderError);
        }
    }

   },

   async deleteOrder(order){

        await this.$store.dispatch('deleteOrder', order);
        this.deleteOrderMessage = this.$store.getters.getDeleteOrderMessage;
        this.deleteOrderError = this.$store.getters.getDeleteOrderError;
        this.responseStatus = this.$store.getters.getResponseStatus;
        if(this.responseStatus == 200){
          this.showDialogMessage(this.deleteOrderMessage);
        }else{
          this.showDialogMessage(this.deleteOrderError);
        }
   },

   async Orders(link){

    await this.$store.dispatch('fetchOrders', link);
    this.orders = this.$store.getters.getOrders;
    this.pagination = this.$store.getters.getPagination;
    this.pagination_links = this.pagination.links;
    this.pagination_links.shift();
    this.pagination_links.pop();
    this.pagination_current_page = this.pagination.currentPageNumber;
    this.pagination_pages = Math.ceil(this.pagination.totalItem/this.pagination.perPage);

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
        this.product_modal_form_title = 'Edit product';  
        this.orderTemplateLabels = {};   
        this.dialog = true;
    }, 

    newItem(){
        this.editedOrder = {};
        this.product_modal_form_title = 'New product'; 
        this.dialog = true;
    },


    editOrdersFormSubmit(){

        this.storeOrder(this.editedOrder);
        this.dialog = false;
        
    },

    deleteItem(order){
        this.deletedIndex = this.orders.indexOf(order);
        this.deleteOrder(order);
        if(this.responseStatus == 200){
        delete this.orders[this.deletedIndex];
        this.orders.splice(this.deletedIndex, 1);
        }
    },
   
    showDialogMessage(text){
        this.dialogMessageText = text;
        this.dialog_message = true;
    },

},
created (){
  
},
watch: {
    "pagination_current_page": (newPage) => {},
    showDialog: function(val) {
      if(val) {
    
      }
    }
}

};

</script>
