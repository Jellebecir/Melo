<template>
    <UContainer class="py-8 space-y-8">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold">
                    {{ groupName }}
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Group details and leaderboard
                </p>
            </div>
            <div class="flex gap-3">
                <UButton color="primary" icon="i-heroicons-plus-circle" @click="onRegisterMatch">
                    Register Match
                </UButton>

                <UButton color="neutral" variant="outline" icon="i-heroicons-link" title="Share"
                    @click="copyJoinCode" />

                <UButton color="neutral" variant="outline" icon="heroicons:arrow-right-start-on-rectangle-solid"
                    title="Leave group" @click="onLeaveGroup" />
            </div>
        </div>
        <GroupLeaderboard />
        <GroupMembers />
        <GroupMatches />
    </UContainer>
</template>

<script lang="ts" setup>
import { ConfirmModal, RegisterMatchModal } from '#components';

const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const overlay = useOverlay();

const groupId = route.params.id as string;
const { data } = await supabase
    .from("groups")
    .select("name, join_code")
    .eq("id", groupId)
    .single();
const groupName = data.name;
const joinCode = data.join_code;

const matchRegisterModal = overlay.create(RegisterMatchModal, {
    props: {
        groupId: groupId,
    },
});
const leaveGroupModal = overlay.create(ConfirmModal, {
    props: {
        title: "Leave group",
        description: "Are you sure you want to leave this group?",
    },
});

const onRegisterMatch = async () => {
    const registered = await matchRegisterModal.open()
    if (registered) {
        useLeaderboard().getLeaderboard(groupId);
    }
};

const copyJoinCode = () => {
    navigator.clipboard.writeText(joinCode)
    // Optional: show toast or confirmation
    console.log(`Copied join code: ${joinCode}`);
};

const onLeaveGroup = async () => {
    leaveGroupModal.open()
        .then(async (confirmed) => {
            if (confirmed) {
                const { error } = await supabase.rpc('remove_member_from_group', {
                    p_group_id: groupId,
                    p_user_id: user.value.id,
                });

                if (error) {
                    // Handle error (e.g., show a toast or alert)
                    console.error(error.message);
                } else {
                    navigateTo("/groups");
                }
            }
        });
};

</script>

<style></style>