<template>
    <UContainer class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <header class="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-800 px-4">
            <div class="flex items-center gap-4">
                <NuxtLink to="/" class="font-semibold">Home</NuxtLink>
                <NuxtLink to="/groups">Groups</NuxtLink>
                <NuxtLink to="/profile">Profile</NuxtLink>
            </div>

            <UDropdownMenu :items="menuItems" :ui="{ item: 'text-left' }">
                <UButton color="gray" variant="ghost" class="flex items-center gap-2">
                    <UAvatar src="https://ui-avatars.com/api/?name=User" size="xs" alt="User Avatar" />
                    <span class="hidden sm:block">{{ user.email }}</span>
                    <Icon name="i-heroicons-chevron-down" />
                </UButton>
            </UDropdownMenu>
        </header>
        <main class="p-4">
            <slot />
        </main>
    </UContainer>
</template>

<script setup>
const colorMode = useColorMode();
const supabase = useSupabaseClient();
const router = useRouter();
const user = useSupabaseUser()

const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
}

const menuItems = [
    [{ label: 'Profile', icon: 'i-heroicons-user', to: '/profile' }],
    [{ label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: 'profile/settings' }],
    [{
        label: colorMode.preference === 'dark' ? 'Light Mode' : 'Dark Mode',
        icon: 'i-heroicons-moon',
        click: toggleTheme
    }],
    [{
        label: 'Logout',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: logout,
    }]
]
</script>