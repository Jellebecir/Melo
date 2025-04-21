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
const route = useRoute();
const groupId = route.params.id;
const UAvatar = resolveComponent('UAvatar');
const Icon = resolveComponent('Icon');

const { leaderboard, loading } = storeToRefs(useLeaderboard());
const { getLeaderboard } = useLeaderboard();

useAsyncData('leaderboard', () => {
    getLeaderboard(groupId);
});

const getRowUserIcon = (row) => {
    const user = row.original;
    return h(UAvatar, {
        src: user.avatar_url,
        size: 'lg'
    });
};

const getRowUserName = (row) => {
    const user = row.original;
    return h('p', undefined, user.name);
};

const getRowUser = (row) => {
    return h('div', { class: 'flex items-center gap-3' }, [
        getRowUserIcon(row),
        getRowUserName(row)
    ]);
};

const columns = [
    {
        accessorKey: "rank",
        header: "Rank",
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return getRowUser(row);
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
