<template>
    <div class="main flex justify-center items-center h-screen">
      <div clas="menu grid place-items-center h-screen">

        <router-link to='/orders' class="pointer-events-auto ml-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Orders</router-link>

    </div> 
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'main',
    components: {}
}
</script>