<template>
    <UModal
        title="Join group"
        description="Enter the join code to join a group"
        :dismissible="false"
        :close="{ onClick: () => emit('close', false) }"
    >
      <template #body>
          <div class="p-4">
              <UInput
                  v-model="joinCode"
                  placeholder="Join code"
                  size="lg"
              />
              <div class="text-error-500" v-if="joinError">{{ joinError }}</div>
          </div>
      </template>
      <template #footer>
          <UButton 
              @click="onJoinGroup"
              :loading="joinLoading"
              :disabled="!joinCode"
          >
              Join
          </UButton>
      </template>
  </UModal>
</template>

<script lang="ts" setup>

const emit = defineEmits(['close']);
const router = useRouter();
const joinCode = ref(''); 

const { 
    loading: joinLoading, 
    error: joinError, 
    joinGroup,
} = useJoinGroup();

const onJoinGroup = () => {
    joinGroup(joinCode.value)
        .then(groupId => {
            if (groupId) {
                router.push(`/groups/${groupId}`);
                emit('close');
            }
        });
}

</script>
