import { defineStore } from 'pinia'

export const useLeaderboard = defineStore('leaderboard', () => {
    const supabase = useSupabaseClient();

    const leaderboard = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const getLeaderboard = (groupId: string) => {
        loading.value = true;
        return supabase.rpc('get_group_leaderboard', { p_group_id: groupId })
            .then(({ data, error: fetchError }) => {
                loading.value = false;
                if (fetchError) {
                    error.value = fetchError.message;
                } else {
                    error.value = null;
                    leaderboard.value = data;
                }
            }
        ) as Promise<void>;
    };

    return {
        leaderboard,
        loading,
        error,
        getLeaderboard,
    }
})
