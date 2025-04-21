export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()
    console.log({ to });
    if (!user.value && to.path !== '/auth/login' && to.path !== '/auth/register') {
        return navigateTo('/auth/login');
    }
})
