<template>
    <div>
        <Head>
            <Title>Rently - Create New Inventory</Title>
            <Meta name="description" content="Air Conditioner, Bookcases, Desks, Rugs, Television, Bed, Sofa"/>
        </Head>
        <div class="card p-4 sm:p-7">
            <h2 class="text-2xl sm:text-4xl mb-4 sm:mb-7">Create New Inventory</h2>
            <div class="flex flex-row">
                <input type="text" v-model="inValue" class="p-4 w-8/12 sm:w-6/12 h-[40px] text-sm mr-2 flex rounded-md items-center border-[1px] border-gray-500"/>
                <button class="btn inline-flex w-4/12 sm:w-2/12 justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 sm:ml-3 sm:w-auto" @click="addInventory()">Add Inventory</button>
            </div>

            <h2 class="text-xl sm:text-2xl my-4 sm:my-7">Inventories List</h2>
            <ul class="w-full">
                <li v-for="item in inventory" :value="item">
                    <p class="flex flex-row w-full">
                        <p class="w-9/12 sm:w-5/12 p-2 flex items-center border-[0.5px] border-gray-400 font-normal">{{item.label}}</p>
                        <p class="w-3/12 sm:w-2/12 p-2 flex items-center border-[0.5px] border-gray-400 text-right">
                            <button class="p-3 h-[30px] rounded-md text-sm ml-2 flex items-center border-[0.5px] hover:bg-emerald-700 hover:text-white text-emerald-600 border-emerald-600 text-emerald-600" @click="deleteInventory(item)">Delete</button>
                        </p>
                        
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    const {data: inventories} = await useFetch(' http://localhost:3000/inventories');
    console.log("data", inventories)
    const inventory = useState('inventories',  () => inventories.value);

    const inValue = ref('');

    const addInventory = async() => {
        const {data: responseData} = await useFetch(`http://localhost:3000/inventories`, {
            method: 'post',
            body: {
                "id": inValue.value.replace(/\s/g, ""),
                "label": inValue.value
            },
            onResponse({ request, response, options }) {
                if (response.ok) {
                    inventory.value.push({
                        "id": inValue.value.replace(/\s/g, ""),
                        "value": inValue.value.replace(/\s/g, ""),
                        "label": inValue.value
                    })
                    inValue.value = "";
                }
            }
        });
    }

    const deleteInventory = async(obj) => {
        const {data: responseData} = await useFetch(`http://localhost:3000/inventories/${obj.id}`, {
            method: 'delete',
            onResponse({ request, response, options }) {
                if (response.ok) {
                    inventory.value = [...inventory.value].filter(inv => inv.id !== obj.id);
                }
            }
        })
    }

</script>

<style scoped>

</style>