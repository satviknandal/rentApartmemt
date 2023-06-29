<template>
    <div>
        <div class="mb-10">
            <div class="flex flex-col sm:flex-row sm:justify-center items-start sm:items-center">
                <h2 class="text-xl sm:text-2xl mr-6 pb-2 sm:pb-0 font-normal text-emerald-500">Search Apartments</h2>
                <input type="text" v-model="inpApart" class="p-4 rounded-md w-full sm:w-6/12 h-[40px] text-sm mr-2 flex items-center border-[1px] border-gray-500"/>
            </div>
        </div>
        <div v-if="filterApartments().length > 0">
            <div class="grid grid-cols-1 md:grid-cols-2 text-left gap-5">
                <div v-for="p in filterApartments()">
                    <Card :data="p"/>
                </div>
            </div>
        </div>
        <div v-if="filterApartments().length === 0">
            <div class="card p-10">
               No data available
            </div>
        </div>
    </div>
</template>

<script setup>
    
    const {data: apartments} = await useFetch('http://localhost:3000/list');
    const inpApart = ref('');

    const filterApartments = () => {
        return apartments.value.filter(apart => apart.title.toLowerCase().indexOf(inpApart.value.toLowerCase()) !== -1)
    }
</script>
  