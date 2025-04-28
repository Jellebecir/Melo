<template>
    <UCard>
        <UTable 
            :data="matches" 
            :columns="columns" 
            :loading="loading" 
        />
        <!-- {{ matches }} -->
    </UCard>
</template>

<script lang="ts" setup>
import { ProfileCell } from '#components';

const supabase = useSupabaseClient();
const groupId = useRoute().params.id as string;

const { matches, loading } = storeToRefs(useMatches());
const { getMatches } = useMatches();

useAsyncData('matches', () => getMatches(groupId));

const columns = [
    {
        header: "Winner",
        cell: ({ row }) => {
            const user = row.original.winner;
            return h(ProfileCell, {
                user
            });
        }
    },
    {
        header: "Loser",
        cell: ({ row }) => {
            const user = row.original.loser;
            return h(ProfileCell, {
                user
            });
        }
    },
    {
        accessorKey: "elo_change",
        header: "Elo Change",
    },
    {
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.original.created_at);
            return date.toLocaleDateString();
        }
    }
];

</script>

<style>

</style>