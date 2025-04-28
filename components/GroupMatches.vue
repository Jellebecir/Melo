<template>
    <UCard>
        <template #header>
            <div class="flex items-center gap-2">
                <Icon name="heroicons:list-bullet-20-solid" size="1.5rem" />
                <h2 class="text-lg font-semibold">Matches</h2>
                <USwitch
                    v-if="matches.length > 0"
                    v-model="showOnlyUsersMatches"
                    class="ml-auto"
                    size="sm"
                    color="primary"
                    label="Show mine only"
                />
            </div>
        </template>
        <UTable 
            :data="matchesToShow" 
            :columns="columns" 
            :loading="loading" 
        />
    </UCard>
</template>

<script lang="ts" setup>
import { ProfileCell } from '#components';
import ConfirmModal from './ConfirmModal.vue';

const supabase = useSupabaseClient();
const groupId = useRoute().params.id as string;
const user = useSupabaseUser();
const UButton = resolveComponent('UButton');
const Icon = resolveComponent('Icon');
const overlay = useOverlay();
const removeModal = overlay.create(
    ConfirmModal,
    {
        props: {
            title: 'Delete Match',
            description: 'Are you sure you want to delete this match?',
        }
    }
)

const { matches, loading } = storeToRefs(useMatches());
const { getMatches } = useMatches();
useAsyncData('matches', () => getMatches(groupId));

const showOnlyUsersMatches = ref(false);

const matchesToShow = computed(() => {
    if (!showOnlyUsersMatches.value) {
        return matches.value;
    }
    return matches.value.filter((match) => match.loser.id === user.value?.id);
});

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
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const userId = user.value?.id;
            const loserId = row.original.loser.id;
            if (userId !== loserId) {
                return null;
            }
            return h(UButton, {
                onClick: () => {
                    removeModal.open().then((confirmed) => {
                        if (confirmed) {
                            const { match_id } = row.original;
                            supabase.from('matches')
                                .delete()
                                .eq('id', match_id)
                                .then(({error}) => {
                                    if (error) {
                                        // Handle error (e.g., show a notification)
                                        console.error('Error deleting match:', error);
                                        return;
                                    }
                                    getMatches(groupId);
                                });
                        }
                    });
                },
                variant: 'ghost',
                color: 'neutral',
                icon: 'heroicons:trash',
                size: 'sm',
            }
            );
        },
    }
];

</script>
