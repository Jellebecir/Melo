<template>
    <div>
        <h1>Groups</h1>
        <NuxtLink to="groups/create">Create group</NuxtLink>
        <input
            v-model="joinCode"
            type="text"
            placeholder="join code"
            class="input"
            required
        >
        <button @click="onJoinGroup">Join group</button>
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

const user = useSupabaseUser();
const joinCode = ref('');

const {
    getUserGroups,
    loading,
    error,
    groups,
    joinGroup,
} = useGroups();

const onJoinGroup = () => {
    if (joinCode.value) {
        joinGroup(joinCode.value)
            .then(() => {
                // Redirect to the groups page after successful group creation
                getUserGroups();
            })
            .catch((error) => {
                console.error('Error joining group:', error);
            });
    } else {
        console.error('Group name is required');
    }
};

onMounted(() => {
    getUserGroups();
});

</script>

<style></style>