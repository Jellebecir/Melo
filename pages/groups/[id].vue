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
                    @click=""
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

const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const groupId = route.params.id;
const groupName = await supabase
    .from("groups")
    .select("name")
    .eq("id", groupId)
    .single().then(({ data }) => data.name);

const members = ref([]);
const ratings = ref([]);
const selectedMember = ref(null);
const errorMessage = ref("");

onMounted(async () => {
    getOpponents();
});

const getOpponents = async () => {
    const { data: opponents, error: opponentsError } = await supabase
        .from("group_profiles")
        .select("*")
        .neq("id", user.value.id);

    if (opponentsError) {
        errorMessage.value = error.message;
    } else {
        members.value = opponents;
    }
};



const registerMatch = async (groupId, player1Id, player2Id, winnerId) => {
    const { data, error } = await supabase
        .rpc('register_match', {
            p_group_id: groupId,
            p_player_1_id: player1Id,
            p_player_2_id: player2Id,
            p_winner_id: winnerId,
        });

    if (error) {
        console.error('Error registering match:', error);
    } else {
        console.log('Match registered successfully:', data);
    }
};

const onRegisterMatch = async () => {
    const player1Id = user.value.id;
    const player2Id = selectedMember.value;
    const winnerId = selectedMember.value;

    await registerMatch(groupId, player1Id, player2Id, winnerId);
};

</script>

<style></style>