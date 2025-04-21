export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()
    if (!user.value && to.path !== '/auth/login' && to.path !== '/auth/register') {
        return navigateTo('/auth/login');
    }
})
