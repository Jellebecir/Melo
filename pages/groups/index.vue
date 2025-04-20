<template>
    <div>
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">Groups</h1>
            <UButton @click="onJoinGroup" class="btn btn-primary">Join group</UButton>
        </div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error.message }}</div>
        <div v-else-if="groups && groups.length">
            <ul>
                <li v-for="group in groups" :key="group.id">
                    <NuxtLink :to="`/groups/${group.id}`">
                        {{ group.name }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No groups found.</p>
        </div>
        {{ user.email }}
        {{ user.id }}
    </div>
</template>

<script lang="ts" setup>
import { JoinModal } from '#components';

const user = useSupabaseUser();
const overlay = useOverlay();

const joinModal = overlay.create(JoinModal);

const {
    getUserGroups,
    loading,
    error,
    groups,
} = useGroup();

const onJoinGroup = () => {
    joinModal.open({
        onClose: (success: boolean) => {
            if (success) {
                getUserGroups();
            }
        },
    });
};

onMounted(() => {
    getUserGroups();
});

</script>
