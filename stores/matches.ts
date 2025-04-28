import { defineStore } from 'pinia'

export const useMatches = defineStore('matches', () => {
    const supabase = useSupabaseClient();

    const matches = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const getMatches = (groupId: string) => {
        loading.value = true;
        return supabase.rpc('get_group_match_history', { p_group_id: groupId })
            .then(({ data, error: fetchError }) => {
                loading.value = false;
                if (fetchError) {
                    error.value = fetchError.message;
                } else {
                    error.value = null;
                    matches.value = data;
                    return data;
                }
            }
        ) as Promise<void>;
    };

    return {
        matches,
        loading,
        error,
        getMatches,
    }
})
