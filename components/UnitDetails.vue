<template>
    <div class="card">
        <div class="flex flex-row">
            <div class="p-2 sm:p-7 pt-0">
                <img :src="data.img" alt="image" class="mx-auto my-7 rounded-md"/>
            </div>
            <div class="p-2 sm:p-7 pt-0">
                <h2 class="text-2xl sm:text-4xl my-4 sm:my-7">{{data.title}}</h2>
                <p class="text-xl my-4 sm:my-7">{{data.door}} | {{ data.bed}}Bed, {{ data.bath }}Bath</p>
                <p class="text-xl my-4 sm:my-7">${{data.price}}</p>
                <h3 class="font-bold border-b-2 mb-4 pb-2">Description:</h3>
                <p class="mb-7">{{ data.title }} - {{ data.description }}</p>
            </div>
        </div>
        <div class="p-2 sm:p-7 pt-0">
            <h2 class="text-2xl sm:text-3xl my-2 sm:my-4">Inventory List</h2>
            <div class="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-end">
                <div class="w-full pb-4 sm:pb-0 sm:w-8/12 sm:pr-4 form-control">
                    <label for="inventorydropdown" class="block sm:mb-2 text-sm font-medium text-gray-900">Add Inventory Items</label>
                    <select id="inventorydropdown" v-model="selectedInventoryDropdown" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-800">
                        <option selected>Select a Inventory</option>
                        <option v-for="item in inventories" :value="item">{{item.label}}</option>
                    </select>
                </div>
                <div class="w-full pb-4 sm:pb-0 sm:w-3/12 sm:pr-4 form-control">
                    <label for="quantitydropdown" class="block sm:mb-2 text-sm font-medium text-gray-900">Add Quantity</label>
                    <select id="quantitydropdown" v-model="selectedQuantityDropdown" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-800">
                        <option selected>Select Quantity</option>
                        <option v-for="q in quantity" :value="q">{{q}}</option>
                    </select>
                </div>
                <button class="w-full sm:w-1/12 btn text-center h-[40px]" @click="handleSelectedInventory()">Add Inventory</button>
            </div>
            
            <div class="my-7">
                <h3 class="text-xl my-7">Items Added</h3>
                <div v-if="selectedInventory.length > 0 ">
                    <ul>
                        <li v-for="item in selectedInventory" :value="item?.type?.value">
                            <p class="flex flex-row w-full">
                                <p class="w-5/12 p-2 flex items-center border-[0.5px] border-gray-400 font-semibold">{{item.type.label}}</p>
                                <p class="w-4/12 sm:w-5/12 p-2 flex items-center border-[0.5px] border-gray-400">
                                    <input type="text" class="w-full p-3 h-[30px] border-gray-300 rounded-md text-sm mr-2 flex items-center border-[1px]" v-model="item.value">
                                </p>
                                <p class="w-3/12 sm:w-2/12 p-2 flex items-center border-[0.5px] border-gray-400 text-right">
                                    <button class="rounded-md p-3 h-[30px] text-sm ml-2 flex items-center border-[0.5px] text-emerald-600 border-emerald-600 hover:bg-emerald-700 hover:text-white border-emerald-600" @click="handleDeleteItemInventory(item)">Delete</button>
                                </p>
                                
                            </p>
                        </li>
                    </ul>
                </div>
                <div v-else-if="selectedInventory.length === 0">
                    <div>No Items present</div>
                </div>
                
            </div>
            <div v-if="selectedInventory.length > 0">
                <div class="w-full">
                    <button class="inventoryBtn text-center h-[40px]" @click="toggleModal()">Preview & Update Inventories</button>
                </div>
            </div>

            <Modal :show="isModalShown" @close="toggleModal()" @approve="postInventory()">
                <div v-if="selectedInventory.length > 0" class="w-full">
                    <ul>
                        <li v-for="item in selectedInventory" :value="item.type.value">
                            <p class="grid grid-cols-2 w-full">
                                <p class="p-2 flex items-center border-[0.5px] border-gray-400 font-semibold">{{item.type.label}}</p>
                                <p class="p-2 flex items-center border-[0.5px] border-gray-400">{{item.value}}</p>
                            </p>
                        </li>
                    </ul>
                </div>
            </Modal>
        </div>
        
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { quantity } from '@/constants/';
    const selectedInventoryDropdown = ref('');
    const selectedQuantityDropdown = ref('');
    const {data} = defineProps(['data']);
    const {data: inventories} = await useFetch(' http://localhost:3000/inventories');
    
    const selectedInventory = useState('inventorySelected',  () => data.inventories);
    const isModalShown = ref(false)

    const handleSelectedInventory =() => {
        if (selectedInventory.value.length < 20 && selectedInventoryDropdown.value !== "" && selectedQuantityDropdown.value !== "") {
            selectedInventory.value.push({type: selectedInventoryDropdown.value, value: selectedQuantityDropdown.value})
            selectedInventoryDropdown.value = "";
            selectedQuantityDropdown.value = "";
        }
    }

    const handleDeleteItemInventory = (item) => {
        selectedInventory.value = [...selectedInventory.value].filter(inv => inv.type.id !== item.type.id);
    }

    const toggleModal = () => {
        isModalShown.value = !isModalShown.value;
    }

    const postInventory = async () => {
        const {data: responseData} = await useFetch(`http://localhost:3000/list/${data.id}`, {
            method: 'put',
            body: {...data, 'inventories': selectedInventory}
        });
        toggleModal();
    }    

</script>

<style scoped>
    img {
        max-width: 100%;
        max-height: 400px;
    }
    .inventoryBtn {
        @apply btn text-white;
        max-width: 300px;
    }
</style>