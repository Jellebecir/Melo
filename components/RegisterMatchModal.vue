<template>
    <UModal
        title="Register Match"
        description="Register a match by selecting a player you lost to"
    >
        <template #body>
            <USelectMenu
                v-model="selectedOpponent"
                :items="opponents"
                placeholder="Choose a player..."
                icon="i-heroicons-user-group"
                class="w-full"
                :loading="fetchLoading"
            >
                <template #item="{ item }">
                    <div class="flex items-center">
                        <UAvatar
                            :src="item.avatar_url"
                            :alt="item.name"
                            size="sm"
                            class="mr-2"
                        />
                        <span>{{ item.label }}</span>
                    </div>
                </template>
            </USelectMenu>
            <p class="text-error-500 mt-2" v-if="errorMessage">
                {{ errorMessage }}
            </p>
        </template>
        <template #footer>
            <UButton
                color="primary"
                variant="solid"
                :loading="registerLoading"
                :disabled="!selectedOpponent"
                @click="onRegisterMatch"
            >
                Register
            </UButton>
            <UButton
                color="gray"
                variant="solid"
                @click="emit('close', false)"
                class="ml-2"
            >
                Cancel
            </UButton>
        </template>
    </UModal>
</template>

<script lang="ts" setup>

interface Props {
    groupId: string;
}

// State
const emit = defineEmits<{ close: [boolean]}>();
const props = defineProps<Props>();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const selectedOpponent = ref(null);

const opponentId = computed(() => {
    return selectedOpponent.value ? selectedOpponent.value.value : null;
});

const errorMessage = ref("");

const { opponents, error: opponentsError, loading: fetchLoading } = useGroupOpponents();

if (opponentsError.value) {
    errorMessage.value = "Error fetching opponents: " + opponentsError.value.message;
}

const { loading: registerLoading, registerMatch } = useRegisterMatch();

const onRegisterMatch = async () => {
    registerMatch(props.groupId, opponentId.value)
        .then(() => {
            emit("close", true);
        })
        .catch((error) => {
            errorMessage.value = "Error registering match: " + error.message;
        });
};

</script>
