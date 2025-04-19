<template>
    <div>
        <h1 class="text-2xl font-bold">Group Members</h1>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <select v-model="selectedMember">
            <option v-for="member in members" :key="member.id" :value="member.id">
                {{ member.name }}
            </option>
        </select>
        {{ selectedMember }}
        <button @click="onRegisterMatch">
            Register Match
        </button>
    </div>
</template>

<script lang="ts" setup>

const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const groupId = route.params.id;
const members = ref([]);
const ratings = ref([]);
const selectedMember = ref(null);
const errorMessage = ref("");

onMounted(async () => {
    getOpponents();
    getGroupLeaderboard(groupId);
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

const getGroupLeaderboard = async (groupId) => {
  const { data, error } = await supabase
    .rpc('get_group_leaderboard', { p_group_id: groupId });

  if (error) {
    console.error('Error fetching leaderboard:', error);
  } else {
    console.log('Leaderboard data:', data);
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