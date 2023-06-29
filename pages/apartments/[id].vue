<template>
    <div>
        <Head>
            <Title>{{apartment.title}}</Title>
            <Meta name="description" :content="apartment.title + ' - ' + apartment.description"/>
        </Head>
        <UnitDetails :data="apartment"/>
    </div>
</template>

<script setup>
    const {id} = useRoute().params;
    const uri = " http://localhost:3000/list/" + id;
    const {data: apartment} = await useFetch(uri, {key:id});
    if(!apartment.value){
        throw createError({ statusCode: 404, statusMessage: 'Apartment Not Found', fatal: true})
    }
</script>
  