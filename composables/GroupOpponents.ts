export const useGroupOpponents = () => {
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    const loading = ref(false);
    const error = ref<string | null>(null);
    const opponents = ref<any[]>([]);

    supabase
        .from("group_profiles")
        .select("id, name, avatar_url")
        .neq("id", user.value?.id)
        .then(({ data, error: fetchError }) => {
            loading.value = false;
            if (fetchError) {
                error.value = fetchError.message;
            }
            else {
                error.value = null;
                opponents.value = data.map((opponent) => ({
                    value: opponent.id,
                    label: opponent.name,
                    avatarUrl: opponent.avatar_url,
                }));
            }
        });

    return {
        loading,
        error,
        opponents,
    };
}
