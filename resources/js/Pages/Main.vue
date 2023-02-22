<template>
    <div class="main flex justify-center items-center h-screen">
        <div class="menu grid place-items-center">
            <div class="">
                <div class="place-items-center text-center">
                    <router-link data-ordersSrc="" to='/orders'
                        class="py-2 px-5 pointer-events-auto rounded-md bg-indigo-600 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Orders</router-link>
                </div>
                <div class="place-items-center my-5">
                    <v-checkbox v-model="this.ordersSrcTrue" @click="this.SetOrdersSrc('toggle')" label="orders from microservice"></v-checkbox>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

import { useStore, mapState, mapMutations, mapGetters, mapActions, storeKey } from 'vuex';

export default {
    name: 'main',
    components: {

    },
    data() {
        return {
            ordersSrc: '',
            ordersSrcTrue: false
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.SetOrdersSrc();
    },
    methods: {

        SetOrdersSrc(event) {

            this.ordersSrc = localStorage.getItem('ordersSrc');
            if (!this.ordersSrc) {
                this.ordersSrc = 'local';
            }
            if (event == 'toggle') {
                if (this.ordersSrc != 'microservice') {
                    this.ordersSrc = 'microservice';
                } else {
                    this.ordersSrc = 'local';
                }
            } else {

                if (this.ordersSrc == 'microservice') {
                    this.ordersSrc = 'microservice';
                    this.ordersSrcTrue = true;
                }
            }
            this.$store.dispatch('commitOrdersSrc', this.ordersSrc);
            localStorage.setItem('ordersSrc', this.ordersSrc);

        },

    },

}



</script>