<template>
    <div>
        <UInput 
            v-model="email"
            trailing-icon="i-lucide-at-sign" 
            placeholder="Enter your email" 
            size="md"
        />

        <UInput
            v-model="password"
            placeholder="Password"
            :type="show ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
        >
            <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="show"
                aria-controls="password"
                @click="show = !show"
            />
            </template>
        </UInput>
        <UButton 
            @click="signIn" 
        >
            Login
        </UButton>
        <p>
            Don't have an account?
        </p>
        <UButton to="auth/register">
            Sign up
        </UButton>
    </div>
</template>

<script setup lang="ts">

const supabase = useSupabaseClient();

const email = ref('');
const show = ref(false);
const password = ref('');

const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });
    if (error) {
        console.error('Error signing in:', error.message);
    } else {
        // Redirect to the confirm page after successful login
        navigateTo('/auth/confirm');
    }
};

</script>
  