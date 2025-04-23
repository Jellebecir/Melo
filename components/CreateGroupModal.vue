<template>
    <UModal
        title="Join group"
        description="Enter the join code to join a group"
        :dismissible="false"
        :close="{ onClick: () => emit('close', undefined) }"
    >
        <template #body>
            <div class="p-4">
                <UInput
                    v-model="groupName"
                    placeholder="Group name"
                    size="lg"
                />
                <p class="text-error-500" v-if="createError">{{ createError }}</p>
            </div>
        </template>
        <template #footer>
            <UButton 
                @click="onCreateGroup"
                :loading="createLoading"
                :disabled="!groupName"
            >
                    Create
            </UButton>
            <UButton 
                color="neutral"
                variant="outline"
                @click="emit('close', undefined)"
            >
                Cancel
            </UButton>
        </template>
  </UModal>
</template>

<script lang="ts" setup>

const emit = defineEmits(['close']);
const groupName = ref(''); 
const user = useSupabaseUser();

const { 
    loading: createLoading, 
    error: createError, 
    createGroup,
} = useCreateGroup();

const onCreateGroup = async () => {
    if (!groupName.value) {
        createError.value = "Group name is required";
        return;
    }

    if (!user.value) {
        createError.value = "You must be logged in to create a group";
        return;
    }

    createGroup(groupName.value).then(groupId => {
        if (groupId) {
            emit('close', groupId);
        }
    })
};

</script>
