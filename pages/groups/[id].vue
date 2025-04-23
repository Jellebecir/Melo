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
        <GroupLeaderboard :groupId="groupId" />
    </UContainer>
</template>

<script lang="ts" setup>
import { RegisterMatchModal } from '#components';

const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const overlay = useOverlay();

const groupId = route.params.id as string;
const groupName = await supabase
    .from("groups")
    .select("name")
    .eq("id", groupId)
    .single().then(({ data }) => data.name);

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

const copyJoinCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // Optional: show toast or confirmation
    console.log(`Copied join code: ${code}`)
};

</script>

<style></style>