<template>
  <header class="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-800 px-4">
    <div class="flex items-center gap-4">
        <NuxtLink to="/" class="font-semibold">Home</NuxtLink>
        <NuxtLink to="/groups">Groups</NuxtLink>
        <NuxtLink to="/profile">Profile</NuxtLink>
    </div>
    <UDropdownMenu 
        :items="menuItems" 
        :ui="{ item: 'text-left' }"
    >
        <UButton 
            color="gray" 
            variant="ghost" 
            class="flex items-center gap-2"
        >
            <UAvatar 
                :src="avatar.avatar_url" 
                size="xs" 
                alt="User Avatar" 
            />
            <span class="hidden sm:block">
                {{ avatar.name }}
            </span>
            <Icon name="i-heroicons-chevron-down" />
        </UButton>
    </UDropdownMenu>
</header>
</template>

<script lang="ts" setup>
import { ConfirmModal } from '#components';

const supabase = useSupabaseClient();
const router = useRouter();

const colorMode = useColorMode();
const avatar = await useAvatar();

const overlay = useOverlay();
const logoutModal = overlay.create(ConfirmModal, {
    props: {
        title: 'Logout',
        description: 'Are you sure you want to logout?',
    }
});

const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const logout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
}

const onLogout = async () => {
    const shouldLogout = await logoutModal.open();
    if (shouldLogout) {
        await logout();
    }
}

const menuItems = [
    [{ label: 'Profile', icon: 'i-heroicons-user', to: '/profile' }],
    [{ label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '/profile/settings' }],
    [{
        label: colorMode.preference === 'dark' ? 'Light Mode' : 'Dark Mode',
        icon: 'i-heroicons-moon',
        onSelect: toggleTheme
    }],
    [{
        label: 'Logout',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        onSelect: onLogout,
    }]
];

</script>
