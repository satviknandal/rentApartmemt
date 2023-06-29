<template>
    <div v-show="show" class="modal-overlay min-h-[100%]">
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">

                    <div class="mt-3 text-center sm:mt-0 sm:text-left  w-full">
                        <h3 class="text-2xl font-semibold text-gray-900 mb-5" id="modal-title">Preview Inventories</h3>
                        <slot></slot>
                    </div>
                </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" @click="handleApprove()" class="aproveBtn inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 w-full sm:w-auto">Approve</button>
                    <button type="button" @click="handleCancel()" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  </template>
  
  <script setup>
    const {show} = defineProps(['show']);
    const emitSelf = defineEmits(['close', 'approve'])
    const handleCancel = () => {
        emitSelf('close', {message: 'close'})
    }
    const handleApprove = () => {
        emitSelf('approve', {message: 'approve'})
    }
  </script>

  
<style scoped>
    .aproveBtn {
        @apply btn text-white;
        max-width: 100%;
    }
</style>