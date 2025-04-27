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
                <UButton 
                    color="primary" 
                    icon="i-heroicons-plus-circle" 
                    @click="onRegisterMatch"
                >
                    Register Match
                </UButton>

                <UButton 
                    color="neutral" 
                    variant="outline" 
                    icon="i-heroicons-clipboard" 
                    @click="copyJoinCode"
                >
                    Copy Join Code
                </UButton>
            </div>
        </div>
        <GroupLeaderboard />
        <GroupMembers />
    </UContainer>
</template>

<script lang="ts" setup>
import { RegisterMatchModal } from '#components';

const route = useRoute();
const supabase = useSupabaseClient();
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

</script>

<style></style>