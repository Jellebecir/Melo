<template>
  <div>
    <input
      v-model="name"
      type="text"
      placeholder="Group name"
      class="input"
      required
    >
    <button @click="onCreateGroup">Create group</button>
    <button @click="testCreate">test create</button>
  </div>
</template>

<script lang="ts" setup>

const name = ref('');

const { createGroup } = useGroups();

const onCreateGroup = () => {
  if (name.value) {
    createGroup(name.value)
      .then(() => {
        // Redirect to the groups page after successful group creation
        navigateTo('/groups');
      })
      .catch((error) => {
        console.error('Error creating group:', error);
      });
  } else {
    console.error('Group name is required');
  }
}

const testCreate = async () => {
  console.log('Test create function called:', name.value);
  // You can add any additional logic you want to test here
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const { data, error } = await supabase
    .from('groups')
    .insert([
      { name: 'TEST', created_by: user.value.id }
    ]);
  if (error) {
    console.error('Error creating group:', error.message);
  } else {
    console.log('Group created successfully:', data);
  }
};

</script>

<style>

</style>