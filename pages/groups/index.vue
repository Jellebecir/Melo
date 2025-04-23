<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-semibold">
                Your Groups
            </h1>
            <div class="space-x-2">
                <UButton 
                    icon="i-heroicons-plus" 
                    color="primary"
                    @click="onCreateGroup"
                >
                    Create Group
                </UButton>
                <UButton 
                    icon="i-heroicons-key" 
                    variant="outline"
                    color="neutral"
                    @click="onJoinGroup"
                >
                    Join Group
                </UButton>
            </div>
        </div>
        <div 
            v-if="loading" 
            class="text-muted text-center py-8"
        >
            Loading your groups...
        </div>
        <div 
            v-else-if="error" 
            class="text-error-500 text-center py-8"
        >
            {{ error }}
        </div>
        <div 
            v-else-if="groups.length" 
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            <GroupCard 
                v-for="group in groups"
                :key="group.id"
                :group="group"
            />
        </div>
        <div v-else class="text-muted text-center py-8">
            You haven't joined any groups yet.
        </div>
    </div>
</template>

<script lang="ts" setup>
import { JoinModal, CreateGroupModal } from '#components';

const { groups, loading, error, fetchGroups } = useGroupListing();

const router = useRouter();
const overlay = useOverlay();
const joinModal = overlay.create(JoinModal);
const createModal = overlay.create(CreateGroupModal);

const onJoinGroup = () => {
    joinModal.open({
        onClose: (success: boolean) => {
            if (success) {
                fetchGroups();
            }
        },
    });
};

const onCreateGroup = () => {
    createModal.open({
        onClose: (createdGroupId: string) => {
            if (createdGroupId) {
                router.push(`/groups/${createdGroupId}`);
            }
        },
    });
}

</script>
