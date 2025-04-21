<template>
  <UCard class="flex flex-col justify-between hover:ring-2 hover:ring-primary transition">
        <template #header>
            <div class="flex items-center justify-right space-x-2">
                <div class="font-semibold text-lg truncate">
                    {{ group.name }}
                </div>
                <!-- Copy Join Code Button -->
                <UBadge 
                    v-if="group.isOwner"
                    color="info" 
                    variant="subtle"
                    class="mr-auto"
                >
                    <UIcon 
                        name="i-heroicons-user" 
                        class="w-5 h-5" 
                    />
                    Owner
                </UBadge>

                <UButton 
                    icon="i-heroicons-clipboard" 
                    variant="ghost" 
                    color="neutral" 
                    size="sm"
                    @click="copyJoinCode(group.joinCode)" 
                    title="Copy join code" 
                />
            </div>
        </template>

        <div class="text-sm space-y-1">
            <div class="text-muted">
                👥 Members: {{ group.memberCount }}
            </div>
            <div class="text-muted">
                🏆 Your rank: {{ group.userRank ?? '—' }}
            </div>
        </div>

        <template #footer>
            <UButton 
                block 
                icon="i-heroicons-arrow-right" 
                :to="`/groups/${group.id}`" 
                color="primary"
            >
                View Group
            </UButton>
        </template>
    </UCard>
</template>

<script lang="ts" setup>
import type { GroupListingItem } from '#composables/GroupListing';

interface Props {
    group: GroupListingItem;
}

defineProps<Props>();

const copyJoinCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // Optional: show toast or confirmation
    console.log(`Copied join code: ${code}`)
};

</script>
