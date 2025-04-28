<template>
    <UCard>
        <template #header>
            <div class="flex items-center gap-2">
                <Icon name="heroicons:user-group-solid" size="1.5rem" />
                <h2 class="text-lg font-semibold">Members</h2>
            </div>
        </template>
        <UTable 
            :data="members" 
            :columns="columns" 
            :loading="loading" 
        />
    </UCard>
</template>

<script lang="ts" setup>
import { ConfirmModal } from '#components';
import ProfileCell from './ProfileCell.vue';

const Icon = resolveComponent('Icon');
const UButton = resolveComponent('UButton');
const supabase = useSupabaseClient();
const overlay = useOverlay();
const kickMemberModal = overlay.create(ConfirmModal, {
    props: {
        title: "Kick member",
        description: "Are you sure you want to kick this member?",
    },
});

const groupId = useRoute().params.id as string;
const { groupMember } = storeToRefs(useGroupMemberStore());
const { getGroupMembers, members, loading } = useGroupMembers();

getGroupMembers(groupId);

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

if (groupMember.value.role === 'Owner') {
    columns.push({
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            if (user.user_id === groupMember.value.user_id) {
                return h('div', { class: 'flex items-center' });
            }
            return h('div', { class: 'flex items-center' }, [
                h(UButton, {
                    icon: "i-heroicons-trash",
                    variant: "ghost",
                    color: "neutral",
                    onClick: () => {
                        // Handle delete action
                        kickMemberModal.open()
                            .then(async (confirmed) => {
                                if (confirmed) {
                                    const { error } = await supabase.rpc('remove_member_from_group', {
                                        p_group_id: groupId,
                                        p_user_id: user.user_id,
                                    });

                                    if (error) {
                                        // Handle error (e.g., show a toast or alert)
                                        console.error(error.message);
                                    } else {
                                        getGroupMembers(groupId);
                                    }
                                }
                            });
                    }
                })
            ]);
        }
    });
}

</script>
