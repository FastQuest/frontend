<template>
    <span class="flex justify-center py-6 px-2 h-fit w-full bg-black text-white text-xl leading-0.5 overflow-hidden gap-3 select-none">
        <ul v-for="n in 3" class="flex w-fit gap-3" :key="n">
            <li>FLASHQUEST</li>
            <li>-</li>
            <li>FLASHQUEST</li>
            <li>-</li>
            <li>FLASHQUEST</li>
            <li>-</li>
            <li>FLASHQUEST</li>
            <li>-</li>
            <li>FLASHQUEST</li>
            <li>-</li>
            <li>FLASHQUEST</li>
            <li>-</li>
            <li>FLASHQUEST</li>
            <li>-</li>
            <li>FLASHQUEST</li>
            <li>-</li>
            <li>FLASHQUEST</li>
            <li>-</li>
            <li>FLASHQUEST</li>
            <li>-</li>
        </ul>
    </span>
</template>

<style scoped>
    ul {
        --gap: calc(var(--spacing) * 3);
        animation: scroll 20s linear infinite
    }

    @keyframes scroll {
        to {
            transform: translateX(calc(-100% - var(--gap)));
        }
    }
</style>