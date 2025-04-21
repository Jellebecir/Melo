<template>
    <div>
        <input v-model="email" type="email" placeholder="Email" class="input" required />
        <input v-model="password" type="password" placeholder="Password" class="input" required />
        <button @click="signUp" class="button">Sign Up</button>
    </div>
</template>
  
<script setup lang="ts">

const supabase = useSupabaseClient();
const email = ref('');
const password = ref('');

const signUp = async () => {
    const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    });
    if (error) {
        console.error('Error signing up:', error.message);
    } else {
        // Redirect to the confirm page after successful signup
        navigateTo('/auth/confirm');
    }
};

</script>
  