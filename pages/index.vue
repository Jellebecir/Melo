<template>
  <div>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center">
      <h1 class="text-4xl font-bold text-blue-500">Welcome to the Dashboard {{ user.email }}</h1>
    </div>
    <UButton @click="logout" color="neutral" variant="outline">Logout</UButton>
  </div>
</template>

<script lang="ts" setup>

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const logout = async () => {
  const { error } = supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  } else {
    // Redirect to the login page after successful logout
    navigateTo('/login');
  }
};

</script>
