<template>
    <UCard>
        <UTable 
            :data="leaderboard" 
            :columns="columns" 
            :loading="loading" 
        />
    </UCard>
</template>

<script lang="ts" setup>
const ProfileCell = resolveComponent('ProfileCell');
const route = useRoute();
const groupId = route.params.id as string;

const { leaderboard, loading } = storeToRefs(useLeaderboard());
const { getLeaderboard } = useLeaderboard();

useAsyncData('leaderboard', () => {
    return getLeaderboard(groupId);
});

const columns = [
    {
        accessorKey: "rank",
        header: "Rank",
    },
    {
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            return h(ProfileCell, {
                user
            });
        }
    },
    {
        accessorKey: "wins",
        header: "Wins",
    },
    {
        accessorKey: "losses",
        header: "Losses",
    },
    {
        accessorKey: "player_rating",
        header: "Rating",
    }
];

</script>
