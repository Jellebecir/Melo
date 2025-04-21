
export const useGroupLeaderboard = (groupId: string) => {
    const supabase = useSupabaseClient();

    const leaderboard = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const getGroupLeaderboard = () => {
        loading.value = true;
        supabase.rpc('get_group_leaderboard', { p_group_id: groupId })
            .then(({ data, error: fetchError }) => {
                loading.value = false;
                console.log("Leaderboard data:", data);
                if (fetchError) {
                    error.value = fetchError.message;
                } else {
                    error.value = null;
                    leaderboard.value = data;
                }
            }
        );
    };

    getGroupLeaderboard();

    return {
        leaderboard,
        loading,
        error,
    }
}
