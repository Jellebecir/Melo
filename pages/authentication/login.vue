<template>
  <div>
    <input v-model="email" type="email" placeholder="Email" class="input" required />
    <input v-model="password" type="password" placeholder="Password" class="input" required />
    <button @click="signIn" class="button">Login</button>
    <button @click="() => console.log('test', email, password)" class="button">Test</button>
    <p>Don't have an account?</p>
    <NuxtLink to="register">Sign up</NuxtLink>
  </div>
</template>

<script setup lang="ts">

const supabase = useSupabaseClient();

const email = ref('');
const password = ref('');

const test = () => {
  console.log('Test function called:', email.value, password.value);
};

const signIn = async () => {
  console.log('Signing in with email:', email.value);
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.error('Error signing in:', error.message);
  } else {
    // Redirect to the confirm page after successful login
    navigateTo('/confirm');
  }
};

</script>
  