<template>
    <div>
        <header class="shadow-sm bg-white">
            <nav class="container mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="text-2xl font-normal text-emerald-600">Rently Logo</NuxtLink>
                <ul class="flex gap-4 justify-between">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/apartments">Apartments</NuxtLink></li>
                    <li><NuxtLink to="/inventories">Inventories</NuxtLink></li>
                </ul>
            </nav>
        </header>
    </div>

    <!-- Page ContentContainer -->
    <div class="container mx-auto px-4 mt-10 mb-10">
        <slot></slot>
    </div>

    <!--end here-->
    <div class="w-full border-t-2">
        <footer class="container mx-auto p-4 flex justify-between">
            © 2023 Satvikk Nandall
            </footer>
    </div>
</template>

<style scoped>
    .router-link-exact-active {
        @apply text-emerald-600
    }
</style>