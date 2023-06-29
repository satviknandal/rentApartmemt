<template>
    <div class="card text-center">
        <div class="flex flex-row">
            <div class="text-left">
                <img :src="data.img" alt="" class="imageThumb"/>
            </div>
            <div class="p-7 pt-0 text-left">
                <p class="font-semibold mb-5">{{data.title}}</p>
                <p class="mb-2 text-gray-500">
                    <b class="pr-2 font-semibold">Address:</b>{{ data.region }}
                </p>
                <p class="mb-2 text-gray-500">
                    <b class="pr-2 font-semibold">Floor:</b>{{ data.floor }}
                </p>
                <p class="mb-5 text-gray-500">
                    <b class="pr-2 font-semibold">Door Number:</b>{{ data.door }}
                </p>
                <NuxtLink :to="`/apartments/${data.id}`">
                    <button class="btn text-center mw-120">View Details</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { data } = defineProps(['data']);
</script>

<style scoped>
    .imageThumb {
        @apply rounded-md;
        max-height: 250px;
        margin: 0 auto;
        float: left;
    }

</style>