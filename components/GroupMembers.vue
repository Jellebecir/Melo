<template>
    <UCard>
        <UTable 
            :data="members" 
            :columns="columns" 
            :loading="loading" 
        />
    </UCard>
</template>

<script lang="ts" setup>
import ProfileCell from './ProfileCell.vue';

const Icon = resolveComponent('Icon');
const supabase = useSupabaseClient();
const groupId = useRoute().params.id as string;

const members = ref([]);
const loading = ref(true);

supabase.from('group_member_overview')
    .select("*")
    .eq("group_id", groupId)
    .then(({ data, error }) => {
        if (error) {
            console.error('Error fetching group members:', error);
        } else {
            members.value = data;
        }
        loading.value = false;
    });

const columns = [
    {
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            let roleIcon;
            switch (user.role) {
                case 'Owner':
                    roleIcon = h(Icon, {
                        name: "i-heroicons-shield-check",
                    });
                    break;
                case 'Admin':
                    roleIcon = h(Icon, {
                        name: "i-heroicons-user-circle",
                    })
                    break;
                default:
                    roleIcon = null;
            }

            return h('div', { class: 'flex items-center gap-3' }, [
                h(ProfileCell, {
                    user
                }),
                roleIcon,
            ]);
        }
    },
    {
        accessorKey: "games_played",
        header: "Games Played",
    },
    {
        header: "Qualified",
        cell: ({ row }) => {
            const qualified = row.original.qualified;
            return h('div', { class: 'flex items-center ml-6' }, [
                h(Icon, {
                    name: qualified ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
                    class: {
                        'text-success-500': qualified,
                        'text-error-500': !qualified,
                    },
                })
            ]);
        },
    },
];

</script>

<style>

</style>