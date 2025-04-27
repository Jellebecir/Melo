<template>
    <div class="flex items-center gap-3">
        <UAvatar 
            :src="user.avatar_url"
            :alt="user.name"
            size="lg"
        />
        <p>
            {{ user.name }}
        </p>
    </div>
</template>

<script lang="ts" setup>

interface Props {
    user: {
        id: string;
        name: string;
        avatar_url: string;
    };
}

const props = defineProps<Props>();

</script>
