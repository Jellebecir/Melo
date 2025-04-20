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
              @click="join(joinCode)"
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
const joinCode = ref(''); 

const { 
    loading: joinLoading, 
    error: joinError, 
    join,
    onSuccess
} = useJoinGroup();

onSuccess(() => {
    emit('close', true);
});

</script>
