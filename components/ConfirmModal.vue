<template>
    <UModal
        :title="title"
        :dismissible="false"
        :close="{ onClick: () => emit('close', false) }"
    >
        <template #body>
            <p>{{ description }}</p>
        </template>
        <template #footer>
            <UButton
                color="primary"
                variant="solid"
                @click="$emit('close', true)"
            >
                Confirm
            </UButton>
            <UButton
                color="gray"
                variant="solid"
                @click="$emit('close', false)"
                class="ml-2"
            >
                Cancel
            </UButton>
        </template>
    </UModal>
</template>

<script lang="ts" setup>

interface Props {
    title: string;
    description: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['close']);

</script>

<style>

</style>