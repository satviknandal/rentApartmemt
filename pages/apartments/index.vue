<template>
    <div>
        <h2 class="text-4xl my-7 text-emerald-500">Apartments</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 text-left gap-5">
            <div v-for="p in apartmentList">
                <Card :data="p"/>
            </div>
        </div>
    </div>
</template>

<script setup>

    const {data: apartmentList} = await useFetch(' http://localhost:3000/list');

    useHead({
        title: 'Apartments available in Singapore',
        meta: [
            {name: 'description', content: 'Apartments - Condo, HDB, Private Apartment up for Sale and Rent'}
        ]
    })
</script>

<style scoped>
</style>
  